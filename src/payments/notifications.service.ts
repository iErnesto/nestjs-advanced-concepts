import { Injectable } from '@nestjs/common';
import { PaymentFailedEvent } from './events/payments-failed.event';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class NotificationsService {
  @OnEvent(PaymentFailedEvent.key)
  sendPaymentNotification(event: PaymentFailedEvent) {
    console.log('Sending a payment notification');
  }
}
