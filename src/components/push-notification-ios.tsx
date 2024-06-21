import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

class PushNotificationConfig {
  constructor() {
    this.configure();
  }

  configure() {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  localNotification() {
    PushNotification.localNotification({
      title: '🚨 Lage pH-waarde!',
      message:
        'De pH-waarde van uw aquarium is te laag en kan schadelijk zijn voor uw vissen. Open de app om het probleem op te lossen.',
    });
  }
}

export default new PushNotificationConfig();
