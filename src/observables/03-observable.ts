import { Observable, Observer, Subject } from 'rxjs';

const observer: Observer<any> = {
    // Metodos que siempre se exige el valor,error y complete
    next: (value) => console.log(`Siguente [next]: ${value}`),
    error: (error) => console.error(`Error [obs]: ${error}`),
    complete: () => console.info('completado [obs]'),
};
// Cold observable
// por que genera data desde el observable
const intervalo$ = new Observable<Number>((subs) => {
    const intervalID = setInterval(() => subs.next(Math.random()), 1000);

    return () => clearInterval(intervalID);
});

/**
 *
 * Distribucion total a toda la informacion que se tenga
 *
 * 1- Casteo multiple
 * 2- Tambien es un observer
 * 3- Next, error y complete(Se puede manipular)
 */
const subject$ = new Subject();
const intervalSubject = intervalo$.subscribe(subject$);

// const subs1 = intervalo$.subscribe(observer);
// const subs2 = intervalo$.subscribe(observer);

const subs1 = subject$.subscribe(observer);
const subs2 = subject$.subscribe(observer);

// Hot observable
// Por que ingresa datos fuera del observable(cold observable)
setTimeout(() => {
    subject$.next(10);
    subject$.complete();
    intervalSubject.unsubscribe();
}, 3500);
