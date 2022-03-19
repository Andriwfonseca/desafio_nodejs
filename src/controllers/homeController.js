import characters from "../../public/data/characters.json"

export const home = (req, res) =>{

    let charactersAlive = characters.filter(function(char){  
            return char.status == "Alive";
    });

    let firstSeason = [];
    let secondSeason = [];
    let thirdSeason = [];

    charactersAlive.forEach(function(char){      

        firstSeason = [];
        secondSeason = [];
        thirdSeason = [];

        char.episode.forEach(function(episode){
            let number = parseInt(episode.replace(/[^0-9]/g,''));

            if(number <= 11){
                firstSeason.push(number);
            }
            else if(number > 11 && number <= 21){
                secondSeason.push(number);
            }
            else{
                thirdSeason.push(number);
            }                   
            
        });

        char.firstSeason = firstSeason.length;
        char.secondSeason = secondSeason.length;
        char.thirdSeason = thirdSeason.length;
    });
    
    function order( a, b ) {
        if ( a.episode.length > b.episode.length ){
          return -1;
        }
        if ( a.episode.length < b.episode.length ){
          return 1;
        }else{
            if ( a.name < b.name ){
                return -1;
            }
            if ( a.name > b.name ){
                return 1;
            }
            return 0;
        }
    }

    charactersAlive.sort(order);   
    
    res.render('home',{
        "characters": charactersAlive
    });
}