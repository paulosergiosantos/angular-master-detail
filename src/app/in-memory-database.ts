import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './pages/categories/shared/category.model';

export class InMemoryDatabase implements InMemoryDbService {
    createDb(reqInfo?: import("angular-in-memory-web-api").RequestInfo): {} | import("rxjs").Observable<{}> | Promise<{}> {
        const categories: Category[] = [
            { id: 1, name: 'Lazer', description: 'Cinema, parque, praia, etc' },
            { id: 2, name: 'Supermercado', description: 'Alimentação, Higiene, etc' },
            { id: 3, name: 'Saúde', description: 'Plano Saúde, Dentista, Medicamentos, etc' }
        ];

        return { categories };
    }
}