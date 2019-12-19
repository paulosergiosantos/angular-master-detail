import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './pages/categories/shared/category.model';
import { Entry } from './pages/entries/shared/entry.model';

export class InMemoryDatabase implements InMemoryDbService {
    createDb(reqInfo?: import("angular-in-memory-web-api").RequestInfo): {} | import("rxjs").Observable<{}> | Promise<{}> {
        const categories: Category[] = [
            { id: 1, name: 'Moradia', description: 'IPTU, Luz, Água, etc' } as Category,
            { id: 2, name: 'Saúde', description: 'Plano Saúde, Dentista, Medicamentos, etc' } as Category,
            { id: 3, name: 'Lazer', description: 'Cinema, parque, praia, etc' } as Category,
            { id: 4, name: 'Salário', description: 'Recebimento de Salário' } as Category,
            { id: 5, name: 'Aluguel', description: 'Recebimentos de Alugúeis' } as Category
        ];

        const entries: Entry[] = [
            { id: 1, name: 'Gás de Cozinha', description: 'Gás de Cozinha', categoryId: categories[0].id, category: categories[0], paid: true, date: '01/12/2019', amount: '78.80', type: 'expense' } as Entry,
            { id: 2, name: 'Cemig', description: 'Energia Elétrica', categoryId: categories[0].id, category: categories[0], paid: true, date: '02/12/2019', amount: '78.80', type: 'expense' } as Entry,
            { id: 3, name: 'Copasa', description: 'Água e Esgoto', categoryId: categories[0].id, category: categories[0], paid: true, date: '01/12/2019', amount: '78.80', type: 'expense' } as Entry,
            { id: 4, name: 'Oi', description: 'Telefone, Internet e TV', categoryId: categories[0].id, category: categories[0], paid: true, date: '06/12/2019', amount: '108.80', type: 'expense' } as Entry,
            { id: 4, name: 'IPTU', description: 'Impostos', categoryId: categories[0].id, category: categories[0], paid: false, date: '31/12/2019', amount: '115,80', type: 'expense' } as Entry,
            { id: 6, name: 'Farmácia', description: 'Medicamentos', categoryId: categories[1].id, category: categories[1], paid: true, date: '05/12/2019', amount: '78.80', type: 'expense' } as Entry,
            { id: 7, name: 'Plano Saúde', description: 'Co Participação', categoryId: categories[1].id, category: categories[1], paid: true, date: '05/12/2019', amount: '78.80', type: 'expense' } as Entry,
            { id: 8, name: 'Restaurante', description: 'Alimentação', categoryId: categories[2].id, category: categories[2], paid: true, date: '14/12/2019', amount: '78.80', type: 'expense' } as Entry,
            { id: 9, name: 'Salário', description: 'Salário', categoryId: categories[3].id, category: categories[3], paid: false, date: '15/12/2019', amount: '1178.80', type: 'revenue' } as Entry,
            { id: 10, name: 'Aluguel', description: 'Aluguel', categoryId: categories[4].id, category: categories[4], paid: false, date: '20/12/2019', amount: '178.80', type: 'revenue' } as Entry,
        ];

        return { categories, entries };
    }
}