import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductModel } from "./product.model";

@Injectable()
export class ProductsService {
    products: ProductModel[] = []

    list() {
        return [...this.products]
    }

    get(id: String): ProductModel {
        let index = this.products.findIndex(item => item.id === `${id}`)
        if (index === -1) {
            throw new NotFoundException('No found data')
        }
        return this.products[index]
    }

    create(title: String, price: Number): String {
        let productId = +new Date()
        let newProduct = new ProductModel(`${productId}`, title, price);
        this.products.push(newProduct);
        return `${productId}`
    }

    update(id: String, title: String, price: Number): Boolean {
        let product = this.get(id)
        if (product.id) {
            product.title = title
            product.price = price
            return true
        }
        return false
    }

    delete(id: String): Boolean {
        let index = this.products.findIndex(item => item.id === `${id}`)
        if (index !== -1) {
            this.products.splice(index, 1)
            return true
        }
        return false
    }
}

