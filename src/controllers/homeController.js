import characters from "../../public/data/characters.json"

export const home = (req, res) =>{

    const seasons = {
        "firstSeason": 11,
        "secondSeason": 10,
        "thirdSeason": 10
    }

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
                firstSeason.push({
                    "id": char.id,
                    "episodes": number
                });
            }
            else if(number > 11 && number <= 21){
                secondSeason.push({
                    "id": char.id,
                    "episodes": number
                });
            }
            else{
                thirdSeason.push({
                    "id": char.id,
                    "episodes": number
                });
            }                   
            
        });

        char.firstSeason = firstSeason.length;
        char.secondSeason = secondSeason.length;
        char.thirdSeason = thirdSeason.length;
    });

    for(let i = 0;i < charactersAlive.length;i++){
        charactersAlive[i].firstSeason = i;
    }

    console.log(firstSeason);

    res.render('home',{
        "characters": characters
    });
}