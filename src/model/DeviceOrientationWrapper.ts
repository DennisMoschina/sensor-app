/**
 * This class is used to get the device orientation more easily.
 *
 * @author Dennis Moschina
 * @version 1.0
 */
class DeviceOrientationWrapper {
    private enabled: boolean;
    private sensor: DeviceOrientationEvent | null;
    private callback: ((event: DeviceOrientationEvent) => void) | null;

    constructor() {
        this.enabled = false;
        this.sensor = null;
        this.callback = null;
    }

    public async enable(callback: (event: DeviceOrientationEvent) => void) {
        if (typeof DeviceOrientationEvent === 'undefined') {
            throw new Error('DeviceOrientation is not supported');
        }

        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            let permission: PermissionState;
            try {
                permission = await DeviceOrientationEvent.requestPermission();
            } catch {
                throw new Error('cant ask for permission');
            }
            if (permission !== 'granted') {
                throw new Error('Permission to use DeviceOrientation was not granted');
            }
        }

        this.callback = callback;
        window.addEventListener('deviceorientation', this.onDeviceOrientationChange);
        this.enabled = true;
    }

    public disable() {
        if (!this.enabled) {
            return;
        }
        window.removeEventListener('deviceorientation', this.onDeviceOrientationChange);
        this.callback = null;
        this.enabled = false;
    }

    private onDeviceOrientationChange = (event: DeviceOrientationEvent) => {
        if (this.callback) {
            this.callback(event);
        }
    }
}


export default DeviceOrientationWrapper;
