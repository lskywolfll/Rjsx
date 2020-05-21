import { Observable } from 'rxjs'

// Los observable es un estandar usar el $ a final
// const obs$ = Observable.create();

// Esto se recomienda no tener un tipo unknow(desconocido) y poner un tipo
const obs$ = new Observable<String>(subs => {
    // Necesita tener un valor

    subs.next('Hola');
    subs.next('mundo');

    // No va a emitir nada mas
    subs.complete();
    // Esto jamas se ejecutara
    subs.next('holi')
    subs.next('holi')
});

obs$.subscribe(resp => console.log(resp));