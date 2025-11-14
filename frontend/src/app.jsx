jsx
import React, { useState } from 'react'

function App() {
  const [sounds, setSounds] = useState([])
  const [input, setInput] = useState('ağır 808 bass')
  
  const generateSound = async () => {
    try {
      const response = await fetch('/api/generate-sound', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text_input: input,
          duration: 4
        })
      })

      if (!response.ok) throw new Error('API hatası')

      const soundData = await response.json()
      setSounds([...sounds, soundData])
      alert(`🎵 "${input}" sesi üretildi!`)
      
    } catch (error) {
      console.error('Ses üretim hatası:', error)
      alert('❌ Ses üretilemedi! Backend çalışıyor mu?')
    }
  }

  const quickGenerate = (text) => {
    setInput(text)
    generateSound()
  }

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #1a1a2e, #16213e)', 
      color: 'white', 
      minHeight: '100vh', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>🎵 AI Beat Maker - Deep'in Müzik Devrimi!</h1>
      <p>Yaz, Üret, Müzik Yap!</p>

      {/* Ses Üretme */}
      <div style={{ 
        background: 'rgba(255,255,255,0.1)', 
        padding: '20px', 
        borderRadius: '10px', 
        margin: '20px 0'
      }}>
        <h3>🎤 Ses Üret</h3>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="ağır 808 bass, trap snare, hızlı hi-hat..."
          style={{
            padding: '10px',
            margin: '5px',
            border: 'none',
            borderRadius: '5px',
            width: '300px'
          }}
        />
        <button 
          onClick={generateSound}
          style={{
            background: '#ff6b6b',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            margin: '5px'
          }}
        >
          ⚡ Üret & Ekle
        </button>
      </div>

      {/* Hızlı Sesler */}
      <div style={{ 
        background: 'rgba(255,255,255,0.1)', 
        padding: '20px', 
        borderRadius: '10px', 
        margin: '20px 0'
      }}>
        <h3>🚀 Hızlı Sesler</h3>
        <button onClick={() => quickGenerate('ağır 808 bass')}>🔊 808 Bass</button>
        <button onClick={() => quickGenerate('trap snare')}>🥁 Trap Snare</button>
        <button onClick={() => quickGenerate('hızlı hi-hat')}>⏰ Hi-Hat</button>
        <button onClick={() => quickGenerate('karanlık synth')}>🎹 Synth</button>
      </div>

      {/* Üretilen Sesler */}
      <div style={{ 
        background: 'rgba(255,255,255,0.1)', 
        padding: '20px', 
        borderRadius: '10px', 
        margin: '20px 0'
      }}>
        <h3>🎼 Üretilen Sesler ({sounds.length})</h3>
        {sounds.length === 0 ? (
          <p>Henüz ses üretilmedi. Yukarıdan bir ses üret!</p>
        ) : (
          sounds.map(sound => (
            <div key={sound.id} style={{
              background: 'rgba(0,0,0,0.3)',
              padding: '10px',
              margin: '5px 0',
              borderRadius: '5px'
            }}>
              🎵 {sound.name} - {sound.duration}s
            </div>
          ))
        )}
      </div>

      {/* Kontroller */}
      <div style={{ 
        background: 'rgba(255,255,255,0.1)', 
        padding: '20px', 
        borderRadius: '10px', 
        margin: '20px 0'
      }}>
        <h3>🎧 Kontroller</h3>
        <button style={{
          background: '#4ecdc4',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          margin: '5px'
        }}>
          ▶️ ÇAL
        </button>
        <button style={{
          background: '#ff6b6b', 
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          margin: '5px'
        }}>
          ⏹️ DUR
        </button>
      </div>
    </div>
  )
}

export default App
