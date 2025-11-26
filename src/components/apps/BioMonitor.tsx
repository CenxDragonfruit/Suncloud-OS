import { useState, useEffect } from "react";
import { Activity, Cpu, HardDrive, Network, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface VitalSign {
  cpu: number;
  ram: number;
  network: { up: number; down: number };
  storage: number;
}

export const BioMonitor = () => {
  const [vitals, setVitals] = useState<VitalSign>({
    cpu: 45,
    ram: 62,
    network: { up: 0.5, down: 2.3 },
    storage: 68
  });

  const [cpuHistory, setCpuHistory] = useState<number[]>(Array(30).fill(45));
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(prev => ({
        cpu: Math.max(10, Math.min(95, prev.cpu + (Math.random() - 0.5) * 15)),
        ram: Math.max(20, Math.min(90, prev.ram + (Math.random() - 0.5) * 10)),
        network: {
          up: Math.max(0, prev.network.up + (Math.random() - 0.5) * 1),
          down: Math.max(0, prev.network.down + (Math.random() - 0.5) * 2)
        },
        storage: prev.storage
      }));

      setPulsePhase(p => (p + 1) % 360);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCpuHistory(prev => [...prev.slice(1), vitals.cpu]);
  }, [vitals.cpu]);

  const getHealthColor = (value: number) => {
    if (value < 60) return "text-primary";
    if (value < 80) return "text-amber-400";
    return "text-red-500";
  };

  const getHealthGlow = (value: number) => {
    if (value < 60) return "shadow-[0_0_20px_hsl(var(--primary)/0.4)]";
    if (value < 80) return "shadow-[0_0_20px_rgba(251,191,36,0.4)]";
    return "shadow-[0_0_20px_rgba(239,68,68,0.4)]";
  };

  return (
    <ScrollArea className="h-full">
      <div className="min-h-full bg-gradient-to-br from-background via-background/95 to-card/50 p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Activity className={`h-8 w-8 ${getHealthColor(vitals.cpu)} ${getHealthGlow(vitals.cpu)} animate-pulse`} />
            <h2 className="text-3xl font-mono font-bold text-foreground text-glow">BIO-MONITOR</h2>
          </div>
          <p className="text-sm text-muted-foreground font-mono tracking-wider">
            SISTEMA DE SINAIS VITAIS • STATUS: OPERACIONAL
          </p>
        </div>

        {/* Core Pulse - CPU */}
        <Card className="glass-panel p-8 mb-6 relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${
            vitals.cpu < 60 ? 'from-primary/5 via-transparent to-primary/10' :
            vitals.cpu < 80 ? 'from-amber-500/5 via-transparent to-amber-500/10' :
            'from-red-500/5 via-transparent to-red-500/10'
          }`} />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <Cpu className={`h-5 w-5 ${getHealthColor(vitals.cpu)}`} />
              <h3 className="text-lg font-mono font-semibold text-foreground">NÚCLEO DE PROCESSAMENTO</h3>
            </div>

            <div className="flex items-center justify-center gap-8">
              {/* Circular EKG */}
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Background circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                    opacity="0.3"
                  />
                  
                  {/* Pulse circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke={vitals.cpu < 60 ? "hsl(var(--primary))" : vitals.cpu < 80 ? "#f59e0b" : "#ef4444"}
                    strokeWidth="3"
                    strokeDasharray={`${(vitals.cpu / 100) * 502} 502`}
                    strokeLinecap="round"
                    className={`transition-all duration-500 ${getHealthGlow(vitals.cpu)}`}
                    style={{
                      transform: 'rotate(-90deg)',
                      transformOrigin: '100px 100px'
                    }}
                  />

                  {/* Center text */}
                  <text
                    x="100"
                    y="95"
                    textAnchor="middle"
                    className={`text-4xl font-mono font-bold ${getHealthColor(vitals.cpu)} fill-current`}
                  >
                    {vitals.cpu.toFixed(0)}%
                  </text>
                  <text
                    x="100"
                    y="115"
                    textAnchor="middle"
                    className="text-xs font-mono fill-muted-foreground"
                  >
                    CARGA
                  </text>
                </svg>

                {/* Pulse rings */}
                <div 
                  className={`absolute inset-0 rounded-full border-2 ${
                    vitals.cpu < 60 ? 'border-primary/30' : vitals.cpu < 80 ? 'border-amber-400/30' : 'border-red-500/30'
                  } animate-ping`}
                  style={{ animationDuration: `${2000 - vitals.cpu * 10}ms` }}
                />
              </div>

              {/* EKG Waveform */}
              <div className="flex-1">
                <div className="h-32 relative">
                  <svg viewBox="0 0 300 100" className="w-full h-full" preserveAspectRatio="none">
                    <path
                      d={cpuHistory.map((val, i) => 
                        `${i === 0 ? 'M' : 'L'} ${(i / cpuHistory.length) * 300} ${100 - val}`
                      ).join(' ')}
                      fill="none"
                      stroke={vitals.cpu < 60 ? "hsl(var(--primary))" : vitals.cpu < 80 ? "#f59e0b" : "#ef4444"}
                      strokeWidth="2"
                      className={`${getHealthGlow(vitals.cpu)}`}
                    />
                  </svg>
                  
                  {/* Scan line */}
                  <div 
                    className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent animate-pulse"
                    style={{ left: '95%' }}
                  />
                </div>
                <p className="text-xs text-center text-muted-foreground font-mono mt-2">
                  PADRÃO DE ATIVIDADE NEURAL
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Memory Fluid Tanks - RAM */}
        <Card className="glass-panel p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-mono font-semibold text-foreground">TANQUES DE FLUIDO NEURAL</h3>
          </div>

          <div className="flex items-end justify-between gap-4 h-48">
            {Array.from({ length: 8 }).map((_, i) => {
              const segmentValue = (vitals.ram / 8) * (i + 1);
              const isFilled = segmentValue <= vitals.ram;
              const fillHeight = isFilled ? 100 : 0;
              
              return (
                <div key={i} className="flex-1 relative h-full">
                  {/* Tank container */}
                  <div className="absolute inset-0 border border-border/40 rounded-lg overflow-hidden bg-muted/10">
                    {/* Fluid */}
                    <div 
                      className={`absolute bottom-0 left-0 right-0 transition-all duration-500 bg-gradient-to-t from-primary to-primary/50 ${
                        isFilled ? 'shadow-[0_0_15px_hsl(var(--primary)/0.5)]' : ''
                      }`}
                      style={{ height: `${fillHeight}%` }}
                    >
                      {/* Bubbles */}
                      {isFilled && (
                        <>
                          <div className="absolute w-1 h-1 bg-primary/60 rounded-full animate-ping top-1/4 left-1/4" 
                               style={{ animationDuration: '2s', animationDelay: `${i * 0.1}s` }} />
                          <div className="absolute w-1 h-1 bg-primary/60 rounded-full animate-ping top-1/2 right-1/4" 
                               style={{ animationDuration: '1.5s', animationDelay: `${i * 0.15}s` }} />
                        </>
                      )}
                    </div>
                  </div>

                  {/* Level indicator */}
                  <div className="absolute -top-5 left-0 right-0 text-center">
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {((vitals.ram / 8) * (i + 1)).toFixed(0)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-mono text-muted-foreground">
              UTILIZAÇÃO DE MEMÓRIA
            </p>
            <p className={`text-2xl font-mono font-bold ${getHealthColor(vitals.ram)}`}>
              {vitals.ram.toFixed(1)}% <span className="text-sm text-muted-foreground">/ 16 GB</span>
            </p>
          </div>
        </Card>

        {/* Neural Network - Network Activity */}
        <Card className="glass-panel p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Network className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-mono font-semibold text-foreground">SISTEMA NERVOSO DIGITAL</h3>
          </div>

          <div className="relative h-32">
            {/* Synapse nodes */}
            <svg viewBox="0 0 400 100" className="w-full h-full">
              {/* Connection lines */}
              {Array.from({ length: 12 }).map((_, i) => {
                const x1 = (i / 11) * 400;
                const y1 = 50 + Math.sin(i) * 20;
                const x2 = ((i + 1) / 11) * 400;
                const y2 = 50 + Math.sin(i + 1) * 20;
                
                return (
                  <g key={i}>
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="hsl(var(--border))"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                    
                    {/* Pulse */}
                    <circle
                      cx={x1 + ((x2 - x1) * ((pulsePhase + i * 30) % 360)) / 360}
                      cy={y1 + ((y2 - y1) * ((pulsePhase + i * 30) % 360)) / 360}
                      r="2"
                      fill="hsl(var(--primary))"
                      className="shadow-[0_0_8px_hsl(var(--primary))]"
                    >
                      <animate
                        attributeName="opacity"
                        values="0;1;0"
                        dur="2s"
                        repeatCount="indefinite"
                        begin={`${i * 0.15}s`}
                      />
                    </circle>

                    {/* Node */}
                    <circle
                      cx={x1}
                      cy={y1}
                      r="3"
                      fill="hsl(var(--primary))"
                      stroke="hsl(var(--primary))"
                      strokeWidth="1"
                      className="shadow-[0_0_10px_hsl(var(--primary)/0.6)]"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="glass-panel p-4">
              <p className="text-xs text-muted-foreground font-mono mb-1">↑ UPLOAD</p>
              <p className="text-xl font-mono font-bold text-primary">
                {vitals.network.up.toFixed(1)} <span className="text-sm">MB/s</span>
              </p>
            </div>
            <div className="glass-panel p-4">
              <p className="text-xs text-muted-foreground font-mono mb-1">↓ DOWNLOAD</p>
              <p className="text-xl font-mono font-bold text-primary">
                {vitals.network.down.toFixed(1)} <span className="text-sm">MB/s</span>
              </p>
            </div>
          </div>
        </Card>

        {/* Holographic Storage - Storage */}
        <Card className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <HardDrive className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-mono font-semibold text-foreground">ESTRUTURA HOLOGRÁFICA DE DADOS</h3>
          </div>

          <div className="relative h-48 flex items-center justify-center">
            {/* Wireframe storage visualization */}
            <svg viewBox="0 0 200 200" className="w-64 h-64">
              {/* Grid pattern */}
              {Array.from({ length: 8 }).map((_, i) => (
                <g key={`grid-${i}`}>
                  <line
                    x1="50"
                    y1={50 + i * 12.5}
                    x2="150"
                    y2={50 + i * 12.5}
                    stroke={i * 12.5 < (vitals.storage / 100) * 100 ? "hsl(var(--primary))" : "hsl(var(--border))"}
                    strokeWidth="1"
                    opacity={i * 12.5 < (vitals.storage / 100) * 100 ? "0.8" : "0.2"}
                  />
                  <line
                    x1={50 + i * 12.5}
                    y1="50"
                    x2={50 + i * 12.5}
                    y2="150"
                    stroke={i * 12.5 < (vitals.storage / 100) * 100 ? "hsl(var(--primary))" : "hsl(var(--border))"}
                    strokeWidth="1"
                    opacity={i * 12.5 < (vitals.storage / 100) * 100 ? "0.8" : "0.2"}
                  />
                </g>
              ))}

              {/* 3D cube wireframe */}
              <path
                d="M 50 50 L 150 50 L 150 150 L 50 150 Z"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                className="shadow-[0_0_10px_hsl(var(--primary)/0.3)]"
              />
              <path
                d="M 70 30 L 170 30 L 170 130 L 70 130 Z"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                opacity="0.6"
                className="shadow-[0_0_10px_hsl(var(--primary)/0.3)]"
              />
              <line x1="50" y1="50" x2="70" y2="30" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.4" />
              <line x1="150" y1="50" x2="170" y2="30" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.4" />
              <line x1="150" y1="150" x2="170" y2="130" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.4" />
              <line x1="50" y1="150" x2="70" y2="130" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.4" />
            </svg>

            {/* Scan effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-pulse" 
                 style={{ animationDuration: '3s' }} />
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono text-muted-foreground">SETORES UTILIZADOS</span>
              <span className="text-sm font-mono font-bold text-foreground">{vitals.storage.toFixed(0)}%</span>
            </div>
            
            <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500 ${getHealthGlow(vitals.storage)}`}
                style={{ width: `${vitals.storage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>340 GB USADO</span>
              <span>512 GB TOTAL</span>
            </div>
          </div>
        </Card>
      </div>
    </ScrollArea>
  );
};
