import React,{useState,useEffect} from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";

function BotsPage() {
  //start here with your code for step one
  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);

  function addToArmy(bot) {
    //add to army if not already in army
    if(!army.includes(bot)) {
      setArmy([...army,bot]);
    }
  }
  function removeFromArmy(bot){
    //remove from army
    setArmy(army.filter(b => b !== bot));
  }
  function releaseFromArmy(bot){
    //remove from army
    fetch(`http://localhost:8002/bots/${bot.id}`,{
      method: "DELETE",
    })
    .then(res => res.json())
    .then(() => {

    setArmy(army.filter(b => b !== bot));
    setBots(bots.filter(b => b !== bot));
    })
  }
  const fetchBots = () => {
    fetch("http://localhost:8002/bots")
      .then((res) => res.json())
      .then((data) => setBots(data));
  };

  useEffect(() => {
    fetchBots();
  }, []);



  return (
    <div>
      <YourBotArmy army={army} handleRemove={removeFromArmy} releaseFromArmy={releaseFromArmy}/>
      <BotCollection handleAdd={addToArmy} bots={bots} releaseFromArmy={releaseFromArmy}/>
    </div>
  )
}

export default BotsPage;
