import { User } from './user.entity';
import { Product } from 'src/products/entities/product.entity';

export class Order {
  date: Date;
  user: User;
  products: Array<Product>;
}
