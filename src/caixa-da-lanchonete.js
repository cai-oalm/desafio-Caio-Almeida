class CaixaDaLanchonete {
    tabelaDePrecos = {
        cafe: 3,
        suco: 6.2,
        sanduiche: 6.5,
        salgado: 7.25,
        combo1: 9.5,
        combo2: 7.5,
    };

    tabelaDeExtras = {
        chantily: 1.5,
        queijo: 2,
    };

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }
        else {
            let totalCompra = 0;
            let temCafe = false;
            let temSanduiche = false;
            
            for (const temQtd of itens) {
                const [item, qtd] = temQtd.split(',');
                if(parseInt(qtd) === 0)
                    return 'Quantidade inválida!';
                else {
                    if (this.tabelaDePrecos[item]) {
                        totalCompra += this.tabelaDePrecos[item] * qtd;
                        if (item === 'cafe') 
                            temCafe = true;
                        if (item === 'sanduiche') 
                            temSanduiche = true;
                    } 
                    else if (this.tabelaDeExtras[item]) {
                        if ((item === 'chantily' && temCafe) || (item === 'queijo' && temSanduiche)) {
                            totalCompra += this.tabelaDeExtras[item] * qtd;
                        } 
                        else {
                            return 'Item extra não pode ser pedido sem o principal';
                        }
                    } 
                    else {
                        return 'Item inválido!';
                    }
                }
            }
            if (metodoDePagamento === 'dinheiro') {
                totalCompra *= 0.95;
            } else if (metodoDePagamento === 'debito') {
                totalCompra *= 1;
            } else if (metodoDePagamento === 'credito') {
                totalCompra *= 1.03;
            } else {
                return 'Forma de pagamento inválida!';
            }
            totalCompra = parseFloat(totalCompra.toFixed(2));
            return `R$ ${totalCompra.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        }
    }
}
export { CaixaDaLanchonete };
