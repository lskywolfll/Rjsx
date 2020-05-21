import { Observable, Observer } from 'rxjs';

const observer: Observer<any> = {
    // Metodos que siempre se exige el valor,error y complete
    next: (value) => console.log(`Siguente [next]: ${value}`),
    error: (error) => console.error(`Error [obs]: ${error}`),
    complete: () => console.info('completado [obs]'),
};

const intervalo$ = new Observable<Number>((subs) => {
    // Crear un contador, emitir cada segundo el valor 1,2,3,4,5,6,.......

    let contador = 0;

    const interval = setInterval(() => {
        // cada segundo
        contador++;
        subs.next(contador);
        console.log(contador);
    }, 1000);

    setTimeout(() => {
        subs.complete();
    }, 2500);

    // Esto lo ejecuta el unsubscribe
    return () => {
        clearInterval(interval);
        console.log('intervalo destruido');
    };
});

const subscription = intervalo$.subscribe(observer);
const subscription2 = intervalo$.subscribe(observer);
const subscription3 = intervalo$.subscribe(observer);
// Cuando muere el primero todo el resto tambien por que se agregaron a su misma linea
// Cabe destacar que solo el complete funcionara para el primero y no para el resto
subscription.add(subscription2).add(subscription3);

setTimeout(() => {
    // Cancelar la suscripcion
    subscription.unsubscribe();
    // subscription.remove(subscription);
}, 3000);
