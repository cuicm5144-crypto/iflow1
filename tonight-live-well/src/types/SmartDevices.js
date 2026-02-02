// types/SmartDevices.js
export const DeviceTypes = {
  AROMATHERAPY: 'aromatherapy',
  LIGHTING: 'lighting',
  MUSIC: 'music',
  CANDLE: 'candle',
  FAN: 'fan'
};

export const SmartDevices = [
  {
    id: 'device_1',
    name: '智能香薰机',
    type: DeviceTypes.AROMATHERAPY,
    connected: false,
    status: 'offline',
    features: ['定时开关', '香型选择', '浓度调节'],
    brand: '治愈生活'
  },
  {
    id: 'device_2',
    name: '氛围灯光',
    type: DeviceTypes.LIGHTING,
    connected: false,
    status: 'offline',
    features: ['色温调节', '亮度控制', '情景模式'],
    brand: '温馨家居'
  },
  {
    id: 'device_3',
    name: '智能音响',
    type: DeviceTypes.MUSIC,
    connected: false,
    status: 'offline',
    features: ['语音控制', '播放列表', '定时关闭'],
    brand: '音悦无限'
  }
];

// utils/SmartDeviceManager.js
export class SmartDeviceManager {
  constructor() {
    this.devices = this.loadDevices();
  }

  loadDevices() {
    const savedDevices = localStorage.getItem('smartDevices');
    return savedDevices ? JSON.parse(savedDevices) : SmartDevices;
  }

  saveDevices() {
    localStorage.setItem('smartDevices', JSON.stringify(this.devices));
  }

  connectDevice(deviceId) {
    const device = this.devices.find(d => d.id === deviceId);
    if (device) {
      device.connected = true;
      device.status = 'online';
      this.saveDevices();
      return device;
    }
    return null;
  }

  disconnectDevice(deviceId) {
    const device = this.devices.find(d => d.id === deviceId);
    if (device) {
      device.connected = false;
      device.status = 'offline';
      this.saveDevices();
      return device;
    }
    return null;
  }

  getAllDevices() {
    return this.devices;
  }

  getConnectedDevices() {
    return this.devices.filter(d => d.connected);
  }

  sendCommand(deviceId, command, params = {}) {
    // 模拟向设备发送命令
    const device = this.devices.find(d => d.id === deviceId);
    if (device && device.connected) {
      console.log(`发送命令到设备 ${device.name}: ${command}`, params);
      // 这里可以集成实际的设备通信API
      return { success: true, message: `命令已发送到${device.name}` };
    }
    return { success: false, message: '设备未连接' };
  }

  // 根据任务类型触发相关设备
  triggerDevicesForTask(taskType) {
    const connectedDevices = this.getConnectedDevices();
    let triggeredDevices = [];

    switch(taskType) {
      case 'aromatherapy':
        connectedDevices
          .filter(d => d.type === DeviceTypes.AROMATHERAPY)
          .forEach(device => {
            this.sendCommand(device.id, 'start', { scent: 'lavender', duration: 60 });
            triggeredDevices.push(device);
          });
        break;
        
      case 'candle':
        connectedDevices
          .filter(d => d.type === DeviceTypes.LIGHTING)
          .forEach(device => {
            this.sendCommand(device.id, 'setScene', { scene: 'candlelight', brightness: 30 });
            triggeredDevices.push(device);
          });
        break;
        
      case 'music':
        connectedDevices
          .filter(d => d.type === DeviceTypes.MUSIC)
          .forEach(device => {
            this.sendCommand(device.id, 'play', { playlist: 'calm' });
            triggeredDevices.push(device);
          });
        break;
        
      default:
        console.log('没有匹配的智能设备');
    }
    
    return triggeredDevices;
  }
}