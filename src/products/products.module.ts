import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BrandsController } from './controllers/brands.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsController } from './controllers/products.controller';
import { BrandsService } from './services/brands.service';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';
import { Product, ProductSchema } from './entities/product.entity';
import { Category, CategorySchema } from './entities/category.entity';
import { Brand, BrandSchema } from './entities/brand.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
      {
        name: Brand.name,
        schema: BrandSchema,
      },
    ]),
  ],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, BrandsService, CategoriesService],
  exports: [ProductsService],
})
export class ProductsModule {}
