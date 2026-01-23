import React, { useState } from 'react';

const Landing = () => {
    const [look, setLook] = useState(1);
    const techImgs = ["tech1.png", "tech2.png", "tech3.png", "tech4.png", "tech5.png"];

    return (
        <div style={{'backgroundColor': '#0a0a0a', 'color': 'white', 'minHeight': '100vh'}}>
            <nav style={{'padding': '20px', 'display': 'flex', 'justifyContent': 'space-between'}}>
                <img src="/assets/logo_tryonyou.png" style={{'height': '50px'}} />
                <div style={{'color': '#00ff88'}}>● SYSTÈME IA CONNECTÉ</div>
            </nav>

            <header style={{'textAlign': 'center', 'padding': '40px'}}>
                <h1>{CONTENT_FR['HERO_TITLE']}</h1>
                <img src="/assets/montana_pantalones.png" style={{'width': '70%'}} />
            </header>

            <main style={{'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'gap': '40px'}}>
                <div onClick={() => setLook((look % 3) + 1)} style={{'cursor': 'pointer', 'textAlign': 'center'}}>
                    <img src="/assets/pau_blanco_chasquido.png" style={{'width': '180px'}} />
                    <p>{CONTENT_FR['PAU_SNAP']}</p>
                </div>
                <div style={{'border': '4px solid #c5a059', 'borderRadius': '15px', 'overflow': 'hidden'}}>
                    <img src={`/assets/look${look}.png`} style={{'height': '550px'}} />
                </div>
            </main>

            <section style={{'padding': '50px'}}>
                <h2 style={{'textAlign': 'center'}}>{CONTENT_FR['TECH_CLAIM']}</h2>
                <div style={{'display': 'flex', 'gap': '10px'}}>
                    {techImgs.map(img => <img key={img} src={`/assets/${img}`} style={{'width': '19%'}} />)}
                </div>
            </section>

            <footer style={{'textAlign': 'center', 'padding': '60px', 'background': '#111'}}>
                <h2>{CONTENT_FR['FINAL_CTA']}</h2>
                <button style={{'background': '#c5a059', 'padding': '20px', 'fontWeight': 'bold'}}>CRÉER MON AVATAR</button>
            </footer>
        </div>
    );
};
export default Landing;