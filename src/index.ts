import { Observable, Observer } from 'rxjs'

// Es una interfaz el Observer y es como crear el subscribe que estabamos haciendo anteriormente
const observer: Observer<any> = {
    // Metodos que siempre se exige el valor,error y complete
    next: value => console.log(`Siguente [next]: ${value}`),
    error: error => console.error(`Error [obs]: ${error}`),
    complete: () => console.log('completado [obs]')
};

// Los observable es un estandar usar el $ a final
// const obs$ = Observable.create();

// Esto se recomienda no tener un tipo unknow(desconocido) y poner un tipo
const obs$ = new Observable<String>(subs => {
    // Necesita tener un valor

    subs.next('Hola');
    subs.next('mundo');

    // Forzar error para testear los callbacks en subscribe
    // subs.error(new Error('Hola'))
    // Esto jamas llega a ejecutarse y termina por el complete unicamente
    // subs.next('holi despues del fallo')
    // No va a emitir nada mas
    // Quiere decir que ya no mandara mas eventos al subscribe que estaba atentos a las respuestas de este observable!
    // Inclusive puedan llegar mas cosas este no los tomara en cuenta ya que termino no hago mas sigue con tu vida sin mi!
    subs.complete();
    // Esto jamas se ejecutara
    subs.next('holi')
    subs.next('holi')
});

obs$.subscribe(observer);

// Tranforma el contenido del next de los observables y los moldeas
// obs$.subscribe(resp => console.log(resp));

// Otra forma es manipular los 3 valores mediante callbacks
// 1- valor
// 2- error
// 3- completado NT: Siempre vacio por eso se utiliza el () por que no tiene una propiedad para enviarse
// obs$.subscribe(
//     valor => console.log('next: ', valor),
//     error => console.warn('Error: ', error),
//     () => console.log('Completado')
// );