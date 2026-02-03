package com.mawei.app;

import java.util.*;

public class ToxicSoupGenerator {
    
    private static final Random random = new Random();
    
    // 情绪词典
    private static final Map<String, String[]> emotionWords = new HashMap<>();
    
    // 毒鸡汤模板
    private static final List<String> templates = new ArrayList<>();
    
    static {
        // 初始化情绪词典
        emotionWords.put("老板", new String[]{"996福报", "画大饼", "KPI", "年终奖", "升职加薪", "职场PUA"});
        emotionWords.put("周一", new String[]{"蓝色星期一", "周末综合症", "闹钟杀手", "拖延症", "工作恐惧症"});
        emotionWords.put("房贷", new String[]{"房奴", "月光族", "首付", "月供", "房东", "房价"});
        emotionWords.put("工资", new String[]{"996", "加班", "社保", "个税", "薪资倒挂", "降薪"});
        emotionWords.put("工作", new String[]{"摸鱼", "内卷", "躺平", "内耗", "打工人", "社畜"});
        emotionWords.put("爱情", new String[]{"单身狗", "相亲", "催婚", "份子钱", "彩礼", "结婚证"});
        emotionWords.put("朋友", new String[]{"塑料友情", "社交恐惧", "社恐", "朋友圈点赞", "借钱"});
        emotionWords.put("减肥", new String[]{"奶茶", "火锅", "烧烤", "零食", "外卖", "健身房"});
        emotionWords.put("学习", new String[]{"考证", "内卷", "学历焦虑", "技能焦虑", "知识付费", "网课"});
        emotionWords.put("手机", new String[]{"刷短视频", "抖音", "快手", "微博", "知乎", "B站"});
        emotionWords.put("房子", new String[]{"租房", "搬家", "房东", "中介费", "押金", "装修"});
        emotionWords.put("交通", new String[]{"堵车", "地铁", "公交", "停车费", "油费", "打车"});
        emotionWords.put("天气", new String[]{"雾霾", "下雨", "高温", "寒冷", "梅雨季", "台风"});
        emotionWords.put("人生", new String[]{"迷茫", "焦虑", "内耗", "躺平", "摆烂", "emo"});
        
        // 初始化毒鸡汤模板
        templates.add("{topic}说你很重要，但你的{aspect}不这么认为。");
        templates.add("生活就像{topic}，看着很美好，实际上全是套路。");
        templates.add("别问，问就是{aspect}的错。");
        templates.add("你以为{topic}是来拯救你的，实际上它是来收割你的。");
        templates.add("{topic}：我不要你觉得，我要我觉得。");
        templates.add("上帝为你关上一扇门，就会为你打开一扇窗——比如{topic}这扇门。");
        templates.add("{topic}就像{aspect}，明明很普通，却觉得自己很特别。");
        templates.add("你之所以{aspect}，不是因为不够努力，而是因为{topic}本来就这样。");
        templates.add("生活不易，全靠{aspect}演戏。");
        templates.add("{topic}虐我千万遍，我待{topic}如初恋——除非给钱。");
        templates.add("成年人的崩溃，都是静悄悄的，就像{topic}一样无声无息。");
        templates.add("{topic}告诉你努力就会成功，实际上成功都是看脸的。");
        templates.add("人生就像{topic}，你以为在进步，实际上在原地踏步。");
        templates.add("{topic}：我负责貌美如花，你负责赚钱养家——不对，是负责被割韭菜。");
        templates.add("生活不止眼前的苟且，还有远方的苟且——比如{topic}。");
    }
    
    public static String generateSoup(String input) {
        if (input == null || input.trim().isEmpty()) {
            input = "人生";
        }
        
        String topic = input.trim();
        String aspect = getRandomEmotionWord(topic);
        
        String template = templates.get(random.nextInt(templates.size()));
        
        return template.replace("{topic}", topic)
                      .replace("{aspect}", aspect);
    }
    
    private static String getRandomEmotionWord(String topic) {
        String[] words = emotionWords.get(topic);
        if (words == null) {
            // 如果没有找到对应的主题词，随机选择一个通用词
            String[] generalWords = {"现实", "生活", "工作", "社会", "人性", "运气", "颜值", "智商"};
            words = generalWords;
        }
        
        return words[random.nextInt(words.length)];
    }
    
    // 获取输入建议
    public static List<String> getSuggestions() {
        return new ArrayList<>(emotionWords.keySet());
    }
}