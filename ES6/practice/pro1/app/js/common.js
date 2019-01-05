function test () {

    return new Promise(function(resolve, reject){
        var input = document.getElementById('test-promise');

        input.onkeyup = function(){
            if (+input.value)
                resolve(input)
            else
                reject(new Error("No Valid"));
        }
    });
}


test().then(
    function (input) {
        console.log('Valid !!')
        return input;
    },
    function(error) {
        console.warn(error);
        throw Error('Just error !');
    }
)
    .then(
        function(input) {
            input.style.borderColor = 'green';
        }
    )
    .catch(function(error) {
        console.log(error);
    });



