package com.mawei.app;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Typeface;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.FileProvider;

import java.io.File;
import java.io.FileOutputStream;
import java.util.List;

public class MainActivity extends AppCompatActivity {
    
    private EditText etInput;
    private Button btnGenerate;
    private Button btnShare;
    private TextView tvResult;
    private TextView tvSuggestions;
    
    private String currentSoup;
    private Bitmap currentBitmap;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        initViews();
        setupListeners();
        showSuggestions();
    }
    
    private void initViews() {
        etInput = findViewById(R.id.et_input);
        btnGenerate = findViewById(R.id.btn_generate);
        btnShare = findViewById(R.id.btn_share);
        tvResult = findViewById(R.id.tv_result);
        tvSuggestions = findViewById(R.id.tv_suggestions);
    }
    
    private void setupListeners() {
        btnGenerate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                generateSoup();
            }
        });
        
        btnShare.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                shareSoup();
            }
        });
    }
    
    private void showSuggestions() {
        List<String> suggestions = ToxicSoupGenerator.getSuggestions();
        StringBuilder sb = new StringBuilder("热门话题：");
        for (int i = 0; i < Math.min(8, suggestions.size()); i++) {
            if (i > 0) sb.append(" • ");
            sb.append(suggestions.get(i));
        }
        tvSuggestions.setText(sb.toString());
    }
    
    private void generateSoup() {
        String input = etInput.getText().toString().trim();
        if (input.isEmpty()) {
            Toast.makeText(this, "请输入一个话题", Toast.LENGTH_SHORT).show();
            return;
        }
        
        currentSoup = ToxicSoupGenerator.generateSoup(input);
        tvResult.setText(currentSoup);
        
        // 生成文字图片
        currentBitmap = generateTextImage(currentSoup);
        
        Toast.makeText(this, "毒鸡汤生成成功！", Toast.LENGTH_SHORT).show();
    }
    
    private Bitmap generateTextImage(String text) {
        // 创建画布
        int width = 1080;
        int height = 1080;
        Bitmap bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);
        Canvas canvas = new Canvas(bitmap);
        
        // 绘制背景渐变
        Paint backgroundPaint = new Paint();
        backgroundPaint.setColor(Color.parseColor("#1a1a2e"));
        canvas.drawRect(0, 0, width, height, backgroundPaint);
        
        // 绘制装饰元素
        Paint decorationPaint = new Paint();
        decorationPaint.setColor(Color.parseColor("#16213e"));
        for (int i = 0; i < 10; i++) {
            float x = (float) (Math.random() * width);
            float y = (float) (Math.random() * height);
            canvas.drawCircle(x, y, (float) (Math.random() * 50 + 10), decorationPaint);
        }
        
        // 设置文字样式
        Paint textPaint = new Paint();
        textPaint.setColor(Color.WHITE);
        textPaint.setTextSize(60);
        textPaint.setTextAlign(Paint.Align.CENTER);
        textPaint.setTypeface(Typeface.createFromAsset(getAssets(), "fonts/custom.ttf"));
        
        // 绘制文字（支持多行）
        String[] lines = wrapText(text, textPaint, width - 200);
        Paint.FontMetrics fm = textPaint.getFontMetrics();
        float textHeight = fm.descent - fm.ascent;
        float totalTextHeight = lines.length * textHeight;
        
        float startY = (height - totalTextHeight) / 2;
        for (int i = 0; i < lines.length; i++) {
            float y = startY + (i + 1) * textHeight;
            canvas.drawText(lines[i], width / 2, y, textPaint);
        }
        
        // 添加底部装饰
        Paint bottomPaint = new Paint();
        bottomPaint.setColor(Color.parseColor("#e94560"));
        canvas.drawRect(0, height - 100, width, height, bottomPaint);
        
        Paint bottomTextPaint = new Paint();
        bottomTextPaint.setColor(Color.WHITE);
        bottomTextPaint.setTextSize(32);
        bottomTextPaint.setTextAlign(Paint.Align.CENTER);
        bottomTextPaint.setTypeface(Typeface.createFromAsset(getAssets(), "fonts/custom.ttf"));
        canvas.drawText("今天被这个App骂醒了", width / 2, height - 50, bottomTextPaint);
        
        return bitmap;
    }
    
    private String[] wrapText(String text, Paint paint, int maxWidth) {
        String[] words = text.split("");
        StringBuilder currentLine = new StringBuilder();
        StringBuilder result = new StringBuilder();
        
        for (String word : words) {
            String testLine = currentLine.toString() + word;
            float width = paint.measureText(testLine);
            
            if (width > maxWidth && currentLine.length() > 0) {
                result.append(currentLine).append("\n");
                currentLine = new StringBuilder(word);
            } else {
                currentLine.append(word);
            }
        }
        result.append(currentLine);
        
        return result.toString().split("\n");
    }
    
    private void shareSoup() {
        if (currentSoup == null || currentBitmap == null) {
            Toast.makeText(this, "请先生成毒鸡汤", Toast.LENGTH_SHORT).show();
            return;
        }
        
        try {
            // 保存图片到文件
            File file = new File(getExternalFilesDir(Environment.DIRECTORY_PICTURES), "toxic_soup.png");
            FileOutputStream fos = new FileOutputStream(file);
            currentBitmap.compress(Bitmap.CompressFormat.PNG, 100, fos);
            fos.close();
            
            // 分享图片
            Uri uri = FileProvider.getUriForFile(this, getPackageName() + ".fileprovider", file);
            Intent shareIntent = new Intent(Intent.ACTION_SEND);
            shareIntent.setType("image/*");
            shareIntent.putExtra(Intent.EXTRA_STREAM, uri);
            shareIntent.putExtra(Intent.EXTRA_TEXT, currentSoup + " - 来自骂我App");
            shareIntent.setFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            
            startActivity(Intent.createChooser(shareIntent, "分享毒鸡汤"));
            
        } catch (Exception e) {
            Toast.makeText(this, "分享失败：" + e.getMessage(), Toast.LENGTH_SHORT).show();
        }
    }
}