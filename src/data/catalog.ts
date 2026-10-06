import cadernos from "@/assets/p-cadernos.jpg";
import escrita from "@/assets/p-escrita.jpg";
import eletronicos from "@/assets/p-eletronicos.jpg";
import almofadas from "@/assets/p-almofadas.jpg";
import casa from "@/assets/p-casa.jpg";
import presentes from "@/assets/p-presentes.jpg";
import estojos from "@/assets/p-estojos.jpg";
import enfeites from "@/assets/p-enfeites.jpg";
import decoracao from "@/assets/categoria-decoracao.jpg";
import utilidades from "@/assets/categoria-utilidades.jpg";
import papelaria from "@/assets/categoria-papelaria.jpg";

// Preços ilustrativos — podem ser alterados posteriormente pela administração.
export type Product = {
  id: string; name: string; category: "Papelaria" | "Utilidades" | "Decoração" | "Presentes";
  price: number; oldPrice?: number | undefined; image: string; description: string;
  isNew?: boolean; featured?: boolean;
};

export const catalog: Product[] = [
  { id: "c1", name: "Caderno Universitário 10 Matérias", category: "Papelaria", price: 24.9, oldPrice: 29.9, image: cadernos, description: "Capa dura, espiral resistente e 200 folhas pautadas.", featured: true },
  { id: "c2", name: "Caderno Brochura 96 folhas", category: "Papelaria", price: 9.9, image: cadernos, description: "Prático para escola e anotações do dia a dia." },
  { id: "c3", name: "Caderneta de Anotações", category: "Papelaria", price: 12.9, image: cadernos, description: "Tamanho de bolso, ideal para levar na bolsa.", isNew: true },
  { id: "c4", name: "Lápis de Cor 12 Cores", category: "Papelaria", price: 14.9, image: escrita, description: "Cores vivas e minas resistentes.", featured: true },
  { id: "c5", name: "Lápis Grafite (kit com 3)", category: "Papelaria", price: 4.5, image: escrita, description: "Escrita macia, ideal para estudos." },
  { id: "c6", name: "Canetas Esferográficas (kit 4 cores)", category: "Papelaria", price: 8.9, oldPrice: 11.9, image: escrita, description: "Azul, preta, vermelha e verde." },
  { id: "c7", name: "Marca-textos (kit com 4)", category: "Papelaria", price: 16.9, image: escrita, description: "Cores neon para destacar o que importa.", isNew: true },
  { id: "c8", name: "Borracha Branca", category: "Papelaria", price: 2.5, image: escrita, description: "Apaga sem borrar o papel." },
  { id: "c9", name: "Apontador com Depósito", category: "Papelaria", price: 3.9, image: estojos, description: "Lâmina afiada e depósito para resíduos." },
  { id: "c10", name: "Estojo Escolar Duplo", category: "Papelaria", price: 29.9, image: estojos, description: "Dois compartimentos com zíper e estampas variadas.", featured: true },
  { id: "c11", name: "Kit Escolar Completo", category: "Papelaria", price: 49.9, oldPrice: 64.9, image: estojos, description: "Lápis, canetas, marca-textos, borracha, apontador, régua e tesoura.", featured: true },
  { id: "u1", name: "Carregador USB Turbo", category: "Utilidades", price: 34.9, image: eletronicos, description: "Carregamento rápido e seguro para seu celular.", featured: true },
  { id: "u2", name: "Cabo USB-C 1 metro", category: "Utilidades", price: 19.9, oldPrice: 24.9, image: eletronicos, description: "Cabo reforçado para carga e dados." },
  { id: "u3", name: "Fone de Ouvido Bluetooth", category: "Utilidades", price: 69.9, image: eletronicos, description: "Sem fio, com estojo carregador.", isNew: true, featured: true },
  { id: "u4", name: "Adaptador de Tomada", category: "Utilidades", price: 9.9, image: utilidades, description: "Adapta plugues para o padrão brasileiro." },
  { id: "u5", name: "Caixa Organizadora com Tampa", category: "Utilidades", price: 27.9, image: casa, description: "Ideal para armários, gavetas e prateleiras." },
  { id: "u6", name: "Garrafa Térmica 500 ml", category: "Utilidades", price: 39.9, oldPrice: 49.9, image: casa, description: "Mantém bebidas quentes ou geladas por horas.", isNew: true },
  { id: "u7", name: "Caneca de Cerâmica", category: "Utilidades", price: 22.9, image: casa, description: "Acabamento delicado, perfeita para o café." },
  { id: "d1", name: "Capa de Almofada Linho 45x45", category: "Decoração", price: 29.9, image: almofadas, description: "Tecido texturizado em tons terrosos.", featured: true },
  { id: "d2", name: "Almofada Decorativa com Enchimento", category: "Decoração", price: 44.9, oldPrice: 54.9, image: almofadas, description: "Macia e pronta para usar." },
  { id: "d3", name: "Vaso de Cerâmica Decorativo", category: "Decoração", price: 34.9, image: enfeites, description: "Peça artesanal para dar charme ao ambiente.", isNew: true },
  { id: "d4", name: "Enfeites de Madeira (par)", category: "Decoração", price: 39.9, image: enfeites, description: "Detalhe minimalista para estantes e mesas." },
  { id: "d5", name: "Cesto Organizador Decorativo", category: "Decoração", price: 49.9, image: enfeites, description: "Trançado natural, bonito e funcional." },
  { id: "p1", name: "Kit Presente Aconchego", category: "Presentes", price: 89.9, image: presentes, description: "Caneca, vela aromática e mimos em caixa kraft.", featured: true, isNew: true },
  { id: "p2", name: "Caixa Presente com Laço", category: "Presentes", price: 14.9, image: presentes, description: "Embalagem elegante para seus presentes." },
  { id: "p3", name: "Vela Aromática", category: "Presentes", price: 24.9, oldPrice: 29.9, image: decoracao, description: "Aroma suave para presentear com carinho." },
  { id: "p4", name: "Kit Papelaria Presente", category: "Presentes", price: 59.9, image: papelaria, description: "Caderno, canetas e acessórios em embalagem especial." },
];

export const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
