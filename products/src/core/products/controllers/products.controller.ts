import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { Page, SortOrder } from '@/common/@types/pagination';

import { CheckProductsStockAvailabilityDto } from '../dtos/check-products-stock-availability.dto';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ProductDto } from '../dtos/product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { Product } from '../entities/product.entity';
import { ProductMapper } from '../mappers/product.mapper';
import { CheckProductsStockAvailabilityUseCase } from '../usecases/check-products-stock-availability.usecase';
import { CreateProductUseCase } from '../usecases/create-product.usecase';
import { DeleteProductUseCase } from '../usecases/delete-product.usecase';
import { FindAllProductsUseCase } from '../usecases/find-all-products.usecase';
import { FindProductByIdUseCase } from '../usecases/find-product-by-id.usecase';
import { UpdateProductUseCase } from '../usecases/update-product.usecase';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly checkProductsStockAvailabilityUseCase: CheckProductsStockAvailabilityUseCase,
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly findAllProductsUseCase: FindAllProductsUseCase,
    private readonly findProductByIdUseCase: FindProductByIdUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
  ) {}

  @Post('availability')
  @HttpCode(HttpStatus.OK)
  async checkProductsStockAvailability(
    @Body() dto: CheckProductsStockAvailabilityDto,
  ) {
    await this.checkProductsStockAvailabilityUseCase.execute(dto.products);
  }

  @Post()
  async create(@Body() dto: CreateProductDto) {
    await this.createProductUseCase.execute(
      dto.price,
      dto.name,
      dto.description,
      dto.photoUrl,
      dto.stockQuantity,
    );
  }

  @Delete(':productId')
  async delete(@Param('productId', ParseUUIDPipe) productId: string) {
    await this.deleteProductUseCase.execute(productId);
  }

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('sort') sort: SortOrder = 'DESC',
    @Query('sortBy') sortBy: keyof Product = 'createdAt',
    @Query('name') name: string,
  ): Promise<Page<ProductDto>> {
    return this.findAllProductsUseCase
      .execute(page, size, sort, sortBy, name)
      .then((data) => ({
        content: data.content.map(ProductMapper.toDto),
        page: data.page,
      }));
  }

  @Get(':productId')
  async findById(
    @Param('productId', ParseUUIDPipe) productId: string,
  ): Promise<ProductDto> {
    return this.findProductByIdUseCase
      .execute(productId)
      .then(ProductMapper.toDto);
  }

  @Put(':productId')
  async update(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Body() dto: UpdateProductDto,
  ) {
    await this.updateProductUseCase.execute(
      productId,
      dto.price,
      dto.name,
      dto.description,
      dto.photoUrl,
      dto.stockQuantity,
    );
  }
}
