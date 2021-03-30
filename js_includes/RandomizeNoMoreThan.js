function RandomizeNoMoreThan(predicate,n) {
    this.args = [predicate];
    this.run = function(arrays) {
        let moreThanN = true;
        let order;
        while (moreThanN){
            order = randomize(predicate).run(arrays);
            moreThanN = false;
            let previousType = "";
            let current_n = 0;
            for (let i = 0; i < order.length; i++){
                let currentType = order[i][0].type;
                if (currentType != previousType){
                    current_n = 1;
                    previousType = currentType;
                }
                else{
                    current_n++;
                    if (current_n > n){
                        moreThanN = true;
                        break;
                    }
                }
            }
        }
        return order;
    };
}          
function randomizeNoMoreThan(predicate, n) {
    return new RandomizeNoMoreThan(predicate,n);
}