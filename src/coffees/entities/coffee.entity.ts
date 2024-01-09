import { WithUuid } from 'src/common/mixins/with-uuid.mixin/with-uuid.mixin';

export class Coffee {
  constructor(public name: string) {}
}

const CoffeWithUuidCls = WithUuid(Coffee);
const coffe = new CoffeWithUuidCls('Buddy Brew');
