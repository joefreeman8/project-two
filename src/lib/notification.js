import { notify } from 'react-notify-toast'


export function createNotification(message) {
  notify.show(message, 'custom', 3000, { background: '#fbcb46', color: '#000' })
}