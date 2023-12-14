import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { INTERVAL_HOST_KEY } from '../decorators/interval-host-decorator';
import { INTERVAL_KEY } from '../decorators/interval.decorator';

@Injectable()
export class IntervalScheduler implements OnApplicationBootstrap {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
    private readonly medataScanner: MetadataScanner,
  ) {}
  onApplicationBootstrap() {
    const providers = this.discoveryService.getProviders();
    providers.forEach((wrapper) => {
      const { instance } = wrapper;
      const prototype = instance && Object.getPrototypeOf(instance);
      if (!instance || !prototype) {
        return;
      }
      const isIntervalHost =
        this.reflector.get(INTERVAL_HOST_KEY, instance.constructor) ?? false;
      if (!isIntervalHost) {
        return;
      }
      const methodKeys = this.medataScanner.getAllMethodNames(prototype);
      methodKeys.forEach((methodKeys) => {
        const interval = this.reflector.get(INTERVAL_KEY, instance[methodKeys]);
        if (!interval) {
          return;
        }
        setInterval(() => {
          instance[methodKeys]();
        }, interval);
      });
      console.log(wrapper.token);
    });
  }
}
