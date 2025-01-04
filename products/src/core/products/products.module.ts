import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RabbitMQModule } from '@/infra/rabbitmq/rabbitmq.module';

import { ProductsController } from './controllers/products.controller';
import { Product, ProductSchema } from './entities/product.entity';
import { ProductServiceImpl } from './services/implementations/product.service';
import { ProductService } from './services/product-service.interface';
import { CheckProductsStockAvailabilityUseCase } from './usecases/check-products-stock-availability.usecase';
import { CreateProductUseCase } from './usecases/create-product.usecase';
import { DeleteProductUseCase } from './usecases/delete-product.usecase';
import { FindAllProductsUseCase } from './usecases/find-all-products.usecase';
import { FindProductByIdUseCase } from './usecases/find-product-by-id.usecase';
import { SubtractProductsFromStockUseCase } from './usecases/subtract-products-from-stock.usecase';
import { UpdateProductUseCase } from './usecases/update-product.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    RabbitMQModule,
  ],
  providers: [
    { provide: ProductService, useClass: ProductServiceImpl },
    CheckProductsStockAvailabilityUseCase,
    CreateProductUseCase,
    DeleteProductUseCase,
    FindAllProductsUseCase,
    FindProductByIdUseCase,
    SubtractProductsFromStockUseCase,
    UpdateProductUseCase,
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
