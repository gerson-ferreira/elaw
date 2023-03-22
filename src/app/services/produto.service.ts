import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Produto } from "../shared/models/produto.model";

@Injectable({
  providedIn: "root",
})
export class ProdutoService {
  private produtos: Produto[] = [];
  private produtosSubject = new BehaviorSubject<Produto[]>([]);
  private editedProductSubject = new BehaviorSubject<Produto | null>(null);

  constructor() {}

  getProdutos(): Observable<Produto[]> {
    return this.produtosSubject.asObservable();
  }

  addProduto(produto: Produto): void {
    this.produtos.push(produto);
    this.produtosSubject.next(this.produtos);
  }

  clearEditedProduto(): void {
    this.editedProductSubject.next(null);
  }

  updateProduto(produto: Produto): void {
    const index = this.produtos.findIndex((p) => p.id === produto.id);
    if (index !== -1) {
      this.produtos[index] = produto;
      this.produtosSubject.next(this.produtos);
    }
  }

  deleteProduto(id: number): void {
    this.produtos = this.produtos.filter((p) => p.id !== id);
    this.produtosSubject.next(this.produtos);
  }

  getEditedProduto(): Observable<Produto | null> {
    return this.editedProductSubject.asObservable();
  }

  editProduto(produto: Produto): void {
    this.editedProductSubject.next(produto);
  }
}
