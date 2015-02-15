# asyncForeach

asyncForeach([1, 2, 3], function(item, index, done) {
    setTimeout(function() {
        console.log(item);
        done();
    }, 1000);
}, function() {
    console.log('end');
});


Для asyncForeach по аналогии с нативным Array.prototype.forEach функции-callback’и я не проверяю. 
Если пользователь не предоставил - сам себе виноват, получит undefined is not a function.
Для любых типов кроме Array не выполнится ни одной итерации и мы попадем в endFn.
Кроме того Array.prototype.forEach последним необязательным параметром получает thisArg, нам этого явно сейчас не требуется так что не реализовано.

I do not check callback in asyncForeach the same way as no checks in original Array.prototype.forEach.
Also the last param thisArg as in Array.prototype.forEach is not used in this implementation.