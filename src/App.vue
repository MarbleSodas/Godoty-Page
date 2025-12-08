<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const activeOS = ref('windows') // Default highlighting

const handleScroll = () => {
    scrolled.value = window.scrollY > 50
}

const scrollToDownload = () => {
    const el = document.getElementById('download')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
}

// Detect likely OS
const detectOS = () => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    if (userAgent.indexOf("mac") != -1) activeOS.value = 'mac'
    else if (userAgent.indexOf("linux") != -1) activeOS.value = 'linux'
    else activeOS.value = 'windows'
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    detectOS()
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
<div class="min-h-screen flex flex-col">
    
    <!-- Navbar -->
    <nav class="fixed w-full top-0 z-50 transition-all duration-300 border-b border-transparent" :class="{'glass-panel border-godoty-border': scrolled}">
        <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <!-- SVG Logo -->
                <img src="./assets/logo.svg" alt="Godoty Logo" class="w-8 h-8" />
                <span class="font-bold text-xl tracking-tight text-white">Godoty</span>
            </div>
            
            <div class="hidden md:flex items-center gap-8 text-sm font-medium text-godoty-muted">
                <a href="#features" class="hover:text-godoty-blue transition-colors">Features</a>
                <a href="#workflow" class="hover:text-godoty-blue transition-colors">Workflow</a>
                <a href="#pricing" class="hover:text-godoty-blue transition-colors">Pricing</a>
                <a href="#download" class="px-4 py-2 bg-godoty-blue hover:bg-godoty-blueDim text-white rounded-lg transition-all shadow-lg shadow-godoty-blue/20">
                    Get Started
                </a>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <header class="relative pt-32 pb-20 overflow-hidden">
        <div class="absolute inset-0 hero-glow z-0"></div>
        
        <div class="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            
            <!-- Hero Text -->
            <div class="space-y-8 opacity-0 animate-fade-in-up" style="animation-delay: 0.1s;">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-godoty-surface border border-godoty-border text-xs font-medium text-godoty-blue">
                    <span class="relative flex h-2 w-2">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-godoty-blue opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-godoty-blue"></span>
                    </span>
                    Compatible with Godot 4.5
                </div>
                
                <h1 class="text-5xl lg:text-6xl font-bold leading-tight text-white">
                    Your Intelligent <br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-godoty-blue to-cyan-400">Godot Companion</span>
                </h1>
                
                <p class="text-lg text-godoty-muted max-w-xl">
                    Generate plans, debug scripts, and track your project history without leaving your workflow. The AI copilot designed specifically for GDScript.
                </p>
                
                <div class="flex flex-wrap gap-4">
                    <button @click="scrollToDownload" class="px-8 py-3.5 bg-godoty-blue hover:bg-godoty-blueDim text-white font-semibold rounded-xl transition-all transform hover:-translate-y-0.5 shadow-xl shadow-godoty-blue/20 flex items-center gap-2">
                        <i class="ph ph-download-simple text-xl"></i>
                        Download Beta
                    </button>
                    <button class="px-8 py-3.5 bg-godoty-surface border border-godoty-border hover:border-godoty-blue/50 text-white font-medium rounded-xl transition-all flex items-center gap-2">
                        <i class="ph ph-play-circle text-xl"></i>
                        Watch Demo
                    </button>
                </div>

                <div class="flex items-center gap-6 pt-4 text-sm text-godoty-muted">
                    <div class="flex items-center gap-2">
                        <i class="ph ph-check-circle text-godoty-green"></i>
                        <span>Context Aware</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="ph ph-check-circle text-godoty-green"></i>
                        <span>Privacy Focused</span>
                    </div>
                </div>
            </div>

            <!-- Hero Image / UI Mockup -->
            <div class="relative opacity-0 animate-fade-in-up" style="animation-delay: 0.3s;">
                <!-- Decorative Elements -->
                <div class="absolute -top-10 -right-10 w-64 h-64 bg-godoty-blue/10 rounded-full blur-3xl"></div>
                
                <!-- Window Mockup -->
                <div class="relative rounded-xl overflow-hidden bg-godoty-bg border border-godoty-border shadow-2xl animate-float">
                    <!-- Title Bar -->
                    <div class="h-10 bg-godoty-panel border-b border-godoty-border flex items-center px-4 justify-between">
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                            <div class="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                            <div class="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                        </div>
                        <div class="text-xs text-godoty-muted font-mono">2dplatformer - Godoty</div>
                    </div>
                    
                    <!-- Content Area -->
                    <div class="flex h-[400px]">
                        <!-- Sidebar -->
                        <div class="w-48 bg-godoty-panel border-r border-godoty-border p-4 hidden sm:block">
                            <div class="text-xs font-bold text-godoty-muted uppercase tracking-wider mb-4">History</div>
                            <div class="space-y-2">
                                <div class="p-2 rounded bg-godoty-surface text-xs text-godoty-blue border-l-2 border-godoty-blue">Could you...</div>
                                <div class="p-2 rounded hover:bg-godoty-surface/50 text-xs text-godoty-muted cursor-pointer transition-colors">Testing config...</div>
                                <div class="p-2 rounded hover:bg-godoty-surface/50 text-xs text-godoty-muted cursor-pointer transition-colors">Testing session...</div>
                            </div>
                        </div>
                        
                        <!-- Main Chat -->
                        <div class="flex-1 bg-godoty-bg p-6 font-mono text-sm overflow-hidden relative">
                            <!-- User Query -->
                            <div class="mb-6 flex gap-3">
                                <div class="w-8 h-8 rounded bg-godoty-surface flex items-center justify-center shrink-0 text-godoty-muted">
                                    <i class="ph ph-user"></i>
                                </div>
                                <div class="space-y-1">
                                    <p class="text-godoty-muted text-xs">You</p>
                                    <p>Fix the jump mechanics in Player.gd</p>
                                </div>
                            </div>

                            <!-- Bot Response (Plan Card) -->
                            <div class="mb-6 flex gap-3">
                                <div class="w-8 h-8 rounded bg-godoty-blue flex items-center justify-center shrink-0 text-white">
                                    <i class="ph ph-robot"></i>
                                </div>
                                <div class="flex-1 space-y-3">
                                    <p class="text-godoty-muted text-xs">Godoty</p>
                                    
                                    <div class="rounded-lg border border-godoty-border bg-godoty-surface overflow-hidden">
                                        <div class="bg-godoty-panel px-4 py-2 border-b border-godoty-border flex items-center gap-2">
                                            <i class="ph ph-clipboard-text text-yellow-500"></i>
                                            <span class="font-bold text-white text-xs">Plan Generated</span>
                                        </div>
                                        <div class="p-4 space-y-2 text-xs text-gray-300">
                                            <div class="font-bold text-white"># Goal</div>
                                            <p>Refactor input handling for smoother jumps.</p>
                                            <div class="font-bold text-white mt-2">## Proposed Changes</div>
                                            <ul class="list-disc pl-4 space-y-1 text-gray-400">
                                                <li>Update <span class="text-godoty-blue">Player.gd</span> with modern keycodes</li>
                                                <li>Verify <span class="text-godoty-blue">is_on_floor()</span> logic</li>
                                            </ul>
                                        </div>
                                        <div class="bg-godoty-panel px-4 py-3 border-t border-godoty-border flex justify-end">
                                            <button class="bg-godoty-green hover:bg-opacity-90 text-white text-xs px-3 py-1.5 rounded transition-colors font-medium">
                                                Accept & Execute
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Chat Input Placeholder -->
                            <div class="absolute bottom-4 left-4 right-4 h-12 bg-godoty-surface border border-godoty-border rounded-lg flex items-center px-4 text-godoty-muted">
                                <span class="animate-pulse">|</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Features Grid -->
    <section id="features" class="py-24 bg-godoty-panel relative">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-bold text-white mb-4">Built for Godot Developers</h2>
                <p class="text-godoty-muted">Everything you need to accelerate your game development cycle.</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <!-- Feature 1 -->
                <div class="p-6 rounded-2xl bg-godoty-bg border border-godoty-border hover:border-godoty-blue/50 transition-colors group">
                    <div class="w-12 h-12 rounded-lg bg-godoty-surface flex items-center justify-center text-godoty-blue mb-4 group-hover:bg-godoty-blue group-hover:text-white transition-all">
                        <i class="ph ph-brain text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">Smart Planning</h3>
                    <p class="text-godoty-muted text-sm leading-relaxed">
                        Godoty doesn't just guess. It generates detailed execution plans, analyzing your project structure before suggesting changes.
                    </p>
                </div>

                <!-- Feature 2 -->
                <div class="p-6 rounded-2xl bg-godoty-bg border border-godoty-border hover:border-godoty-blue/50 transition-colors group">
                    <div class="w-12 h-12 rounded-lg bg-godoty-surface flex items-center justify-center text-godoty-blue mb-4 group-hover:bg-godoty-blue group-hover:text-white transition-all">
                        <i class="ph ph-code text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">Context Aware</h3>
                    <p class="text-godoty-muted text-sm leading-relaxed">
                        It reads your <code class="text-xs bg-godoty-surface px-1 py-0.5 rounded text-godoty-blue">.gd</code> files and scene structures to provide relevant, bug-free code snippets.
                    </p>
                </div>

                <!-- Feature 3 -->
                <div class="p-6 rounded-2xl bg-godoty-bg border border-godoty-border hover:border-godoty-blue/50 transition-colors group">
                    <div class="w-12 h-12 rounded-lg bg-godoty-surface flex items-center justify-center text-godoty-blue mb-4 group-hover:bg-godoty-blue group-hover:text-white transition-all">
                        <i class="ph ph-bug text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">Auto-Debugging</h3>
                    <p class="text-godoty-muted text-sm leading-relaxed">
                        Encountered an error? Godoty analyzes the stack trace and suggests fixes instantly, reducing downtime.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Download Section -->
    <section id="download" class="py-32 relative overflow-hidden">
        <div class="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
            <div class="w-[800px] h-[800px] bg-godoty-blue/5 rounded-full blur-[100px]"></div>
        </div>

        <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 class="text-4xl font-bold text-white mb-6">Start Building Faster Today</h2>
            <p class="text-godoty-muted mb-12">Available for Windows, macOS, and Linux. Free for open source projects.</p>
            
            <div class="grid md:grid-cols-3 gap-6">
                <!-- Windows -->
                <button 
                    @mouseenter="activeOS = 'windows'" 
                    class="relative group p-6 rounded-xl border border-godoty-border bg-godoty-surface hover:border-godoty-blue transition-all flex flex-col items-center gap-4"
                    :class="{'ring-2 ring-godoty-blue border-transparent transform -translate-y-2': activeOS === 'windows'}"
                >
                    <svg class="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h11.377v11.372H0zM12.623 0H24v11.372H12.623zM0 12.623h11.377V24H0zM12.623 12.623H24V24H12.623z"/></svg>
                    <div class="text-center">
                        <div class="font-bold text-white">Windows</div>
                        <div class="text-xs text-godoty-muted mt-1">x64 Installer</div>
                    </div>
                    <div class="w-full mt-2 py-2 rounded bg-godoty-panel text-sm text-godoty-blue group-hover:bg-godoty-blue group-hover:text-white transition-colors">Download</div>
                </button>

                <!-- Mac -->
                <button 
                    @mouseenter="activeOS = 'mac'" 
                    class="relative group p-6 rounded-xl border border-godoty-border bg-godoty-surface hover:border-godoty-blue transition-all flex flex-col items-center gap-4"
                    :class="{'ring-2 ring-godoty-blue border-transparent transform -translate-y-2': activeOS === 'mac'}"
                >
                    <svg class="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>
                    <div class="text-center">
                        <div class="font-bold text-white">macOS</div>
                        <div class="text-xs text-godoty-muted mt-1">Universal (Intel/M1)</div>
                    </div>
                    <div class="w-full mt-2 py-2 rounded bg-godoty-panel text-sm text-godoty-blue group-hover:bg-godoty-blue group-hover:text-white transition-colors">Download</div>
                </button>

                <!-- Linux -->
                <button 
                    @mouseenter="activeOS = 'linux'" 
                    class="relative group p-6 rounded-xl border border-godoty-border bg-godoty-surface hover:border-godoty-blue transition-all flex flex-col items-center gap-4"
                    :class="{'ring-2 ring-godoty-blue border-transparent transform -translate-y-2': activeOS === 'linux'}"
                >
                    <svg class="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.043c-.06-.003-.12 0-.18 0h-.016c.151-.467-.182-.825-1.065-1.224-.915-.4-1.646-.336-1.77.465-.008.043-.013.066-.018.135-.068.023-.139.053-.209.064-.43.268-.662.669-.793 1.187-.13.533-.17 1.156-.205 1.869v.003c-.02.334-.17.838-.319 1.35-1.5 1.072-3.58 1.538-5.348.334a2.645 2.645 0 00-.402-.533 1.45 1.45 0 00-.275-.333c.182 0 .338-.03.465-.067a.615.615 0 00.314-.334c.108-.267 0-.697-.345-1.163-.345-.467-.931-.995-1.788-1.521-.63-.4-.986-.87-1.15-1.396-.165-.534-.143-1.085-.015-1.645.245-1.07.873-2.11 1.274-2.763.107-.065.037.135-.408.974-.396.751-1.14 2.497-.122 3.854a8.123 8.123 0 01.647-2.876c.564-1.278 1.743-3.504 1.836-5.268.048.036.217.135.289.202.218.133.38.333.59.465.21.201.477.335.876.335.039.003.075.006.11.006.412 0 .73-.134.997-.268.29-.134.52-.334.74-.4h.005c.467-.135.835-.402 1.044-.7zm2.185 8.958c.037.6.343 1.245.882 1.377.588.134 1.434-.333 1.791-.765l.211-.01c.315-.007.577.01.847.268l.003.003c.208.199.305.53.391.876.085.4.154.78.409 1.066.486.527.645.906.636 1.14l.003-.007v.018l-.003-.012c-.015.262-.185.396-.498.595-.63.401-1.746.712-2.457 1.57-.618.737-1.37 1.14-2.036 1.191-.664.053-1.237-.2-1.574-.898l-.005-.003c-.21-.4-.12-1.025.056-1.69.176-.668.428-1.344.463-1.897.037-.714.076-1.335.195-1.814.12-.465.308-.797.641-.984l.045-.022zm-10.814.049h.01c.053 0 .105.005.157.014.376.055.706.333 1.023.752l.91 1.664.003.003c.243.533.754 1.064 1.189 1.637.434.598.77 1.131.729 1.57v.006c-.057.744-.48 1.148-1.125 1.294-.645.135-1.52.002-2.395-.464-.968-.536-2.118-.469-2.857-.602-.369-.066-.61-.2-.723-.4-.11-.2-.113-.602.123-1.23v-.004l.002-.003c.117-.334.03-.752-.027-1.118-.055-.401-.083-.71.043-.94.16-.334.396-.4.69-.533.294-.135.64-.202.915-.47h.002v-.002c.256-.268.445-.601.668-.838.19-.201.38-.336.663-.336zm7.159-9.074c-.435.201-.945.535-1.488.535-.542 0-.97-.267-1.28-.466-.154-.134-.28-.268-.373-.335-.164-.134-.144-.333-.074-.333.109.016.129.134.199.2.096.066.215.2.36.333.292.2.68.467 1.167.467.485 0 1.053-.267 1.398-.466.195-.135.445-.334.648-.467.156-.136.149-.267.279-.267.128.016.034.134-.147.332a8.097 8.097 0 01-.69.468zm-1.082-1.583V5.64c-.006-.02.013-.042.029-.05.074-.043.18-.027.26.004.063 0 .16.067.15.135-.006.049-.085.066-.135.066-.055 0-.092-.043-.141-.068-.052-.018-.146-.008-.163-.065zm-.551 0c-.02.058-.113.049-.166.066-.047.025-.086.068-.14.068-.05 0-.13-.02-.136-.068-.01-.066.088-.133.15-.133.08-.031.184-.047.259-.005.019.009.036.03.03.05v.02h.003z"/></svg>
                    <div class="text-center">
                        <div class="font-bold text-white">Linux</div>
                        <div class="text-xs text-godoty-muted mt-1">.tar.gz AppImage</div>
                    </div>
                    <div class="w-full mt-2 py-2 rounded bg-godoty-panel text-sm text-godoty-blue group-hover:bg-godoty-blue group-hover:text-white transition-colors">Download</div>
                </button>
            </div>
            
            <p class="mt-12 text-xs text-godoty-muted">
                By downloading, you agree to the Terms of Service and Privacy Policy. <br>
                Current Version: v0.9.4 Beta
            </p>
        </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-godoty-border bg-godoty-panel py-12 mt-auto">
        <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="flex items-center gap-3">
                 <img src="./assets/logo.svg" alt="Godoty Logo" class="w-6 h-6" />
                <span class="text-sm font-semibold text-white">Godoty</span>
            </div>
            
            <div class="flex gap-6 text-sm text-godoty-muted">
                <a href="#" class="hover:text-white transition-colors">Documentation</a>
                <a href="#" class="hover:text-white transition-colors">GitHub</a>
                <a href="#" class="hover:text-white transition-colors">Twitter</a>
                <a href="#" class="hover:text-white transition-colors">Discord</a>
            </div>
            
            <div class="text-xs text-godoty-muted">
                &copy; 2025 Godoty AI. All rights reserved.
            </div>
        </div>
    </footer>
</div>
</template>

<style scoped>
/* Scoped styles if needed, but most is in global style.css */
</style>
