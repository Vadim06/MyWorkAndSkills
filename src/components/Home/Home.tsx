import React, { useState, useEffect } from 'react';
import './Home.css';
import { Footer } from '../Footer/Footer';
import { Text } from '../Text/Text';
import imgPerson from '../../img/Lovepik_com-400279584-working-person.png';
const imgCoder = "https://ouch-cdn2.icons8.com/vZD-nOO0-rKGloPBW0WjLQF-i8hfkpa7QWY_3L4YTGA/rs:fit:684:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMzAx/L2Y1ZWI5ZGEwLTM3/ZWMtNDUxYy1iODNl/LTVjMzc1NGU5NjQx/NC5zdmc.png"


export const Home = () => {
  interface RespI {
    discord_status: "online" | "dnd" | "idle";
    username: string;
    discriminator: string;
    discord_user: {
      username: string;
      discriminator: string;
      avatar: string;
      id: string;
    };
    spotify: {
      track_id: string;
      song: string;
      artist: string;
      album_art: string;
    };
  }

  const [statusMsg, setStatusMsg] = useState<string>();
  const [data, setData] = useState<RespI>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ID = "481732194398633994";

    fetch(`https://api.lanyard.rest/v1/users/${ID}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setLoading(false);
        if (res.data.discord_status === "online") {
          setStatusMsg(" and ready to chat!");
        } else if (res.data.discord_status === "idle") {
          setStatusMsg(", but will probably be online soon");
        } else {
          setStatusMsg(", but it doesn't mean you can't leave a message!");
        }
      });


  }, []);


  return (
    <div className="App">
      <main>
        <div className='mainText'>
          <h2 className='hello'>
            Hello there! <span className='wave'>👋🏻</span>
          </h2>
          <h2 className='h2'>
            I am <span className='name'> Vadym Mykhailets </span>
          </h2>
          <br />
          <Text text="Software engineer" typingSpeed={100} />
          <p className={`${data?.discord_status}Bar`}>Right now <span className={data?.discord_status}>{data?.discord_status}</span> on Discord{statusMsg} </p>
        </div>
        <img src={imgCoder} alt="coder" className='coder' />
      </main>
      <section className='introduce'>
        <div className='introduceContainer'>
          <h2 className='h2'>Let me introduce myself</h2>
          <div className='introduceContent'>
            <div className='briefInfo'>
              <p>I am fluent in English</p>
              <p>I like learning new stuff</p>
              <p><i>When I wrote this code, only God and I understood what I did. Now only God knows.</i></p>
            </div>
            <img src={imgPerson} className='laptopGuy' alt="laptop" />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

