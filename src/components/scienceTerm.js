const scienceTerms = {

    // Physics - Mechanics and Motion

    ACCELERATION: {
        definition: "The rate of change of velocity with respect to time. FORMULA: a = Δv/Δt",
        source: "https://www.britannica.com/science/acceleration"
    },
    VELOCITY: {
        definition: "The rate of change of position in a specific direction. FORMULA: v = Δx/Δt",
        source: "https://www.britannica.com/science/velocity"
    },
    FORCE: {
        definition: "A push or pull that can change an object's motion or shape. FORMULA: F = ma",
        source: "https://www.britannica.com/science/force-physics"
    },
    MOMENTUM: {
        definition: "The quantity of motion of a moving body, equal to the product of mass and velocity. FORMULA: p = mv",
        source: "https://www.britannica.com/science/momentum"
    },
    INERTIA: {
        definition: "The resistance of a physical object to any change in its velocity, including changes in speed or direction",
        source: "https://www.britannica.com/science/inertia"
    },
    GRAVITY: {
        definition: "The universal force of attraction between all masses. FORMULA: F = G(m₁m₂)/r²",
        source: "https://www.nasa.gov/universe/gravity"
    },
    FRICTION: {
        definition: "The force resisting relative motion between surfaces in contact. FORMULA: f = μN",
        source: "https://www.britannica.com/science/friction"
    },
    ACID: {
        definition: "Substance that produces H+ ions in solution",
        source: "https://www.britannica.com/science/acid"
    },
    AMPLITUDE: {
        definition: "Maximum displacement from equilibrium position",
        source: "https://www.britannica.com/science/amplitude"
    },
    ANTIMATTER: {
        definition: "Matter with opposite properties of normal matter",
        source: "https://www.britannica.com/science/antimatter"
    },
    ASTEROID: {
        definition: "Rocky object orbiting the Sun",
        source: "https://www.britannica.com/science/asteroid"
    },
    ATMOSPHERE: {
        definition: "Gaseous layer surrounding Earth",
        source: "https://www.britannica.com/science/atmosphere"
    },
    ATOM: {
        definition: "The basic unit of matter, made up of protons, neutrons, and electrons",
        source: "https://www.britannica.com/science/atom"
    },
    BASE: {
        definition: "Substance that produces OH- ions in solution",
        source: "https://www.britannica.com/science/base-chemistry"
    },
    BIOSPHERE: {
        definition: "All life on Earth",
        source: "https://www.britannica.com/science/biosphere"
    },
    BLACKHOLE: {
        definition: "Region where gravity prevents light escape",
        source: "https://www.britannica.com/science/black-hole"
    },
    BOND: {
        definition: "Force holding atoms together in molecules",
        source: "https://www.britannica.com/science/chemical-bond"
    },
    CARNOT: {
        definition: "Ideal heat engine cycle efficiency. FORMULA: η = 1 - Tc/Th",
        source: "https://www.britannica.com/science/Carnot-cycle"
    },
    CATALYST: {
        definition: "Substance that speeds up a reaction without being consumed",
        source: "https://www.britannica.com/science/catalyst"
    },
    CELL: {
        definition: "Basic unit of life",
        source: "https://www.britannica.com/science/cell-biology"
    },
    CENTRIPETAL: {
        definition: "Force directing motion in circular path. FORMULA: F = mv²/r",
        source: "https://www.britannica.com/science/centripetal-force"
    },
    CHROMOSOME: {
        definition: "Structure containing DNA",
        source: "https://www.britannica.com/science/chromosome"
    },
    CLIMATE: {
        definition: "Long-term weather patterns",
        source: "https://www.britannica.com/science/climate"
    },
    COMET: {
        definition: "Icy body that produces gas tail near Sun",
        source: "https://www.britannica.com/science/comet"
    },
    COMPOUND: {
        definition: "Substance made of different elements chemically combined",
        source: "https://www.britannica.com/science/chemical-compound"
    },
    CONDUCTION: {
        definition: "Heat transfer through direct contact",
        source: "https://www.britannica.com/science/conduction-heat-transfer"
    },
    CONVECTION: {
        definition: "The transfer of heat through a fluid (liquid or gas) by the movement of warmer and cooler fluid regions",
        source: "https://www.britannica.com/science/convection"
    },
    DENSITY: {
        definition: "The mass of a substance per unit volume. FORMULA: ρ = m/V",
        source: "https://www.britannica.com/science/density"
    },
    DIFFRACTION: {
        definition: "The bending of waves around obstacles or through openings, characteristic of all wave phenomena",
        source: "https://www.britannica.com/science/diffraction"
    },
    DNA: {
        definition: "A self-replicating material present in nearly all living organisms as the main constituent of chromosomes, carrying genetic information",
        source: "https://www.genome.gov/genetics-glossary/Deoxyribonucleic-Acid"
    },
    DOPPLER: {
        definition: "The change in frequency or wavelength of a wave for an observer moving relative to its source",
        source: "https://www.britannica.com/science/Doppler-effect"
    },
    ELECTRON: {
        definition: "A stable subatomic particle with a negative electric charge, found in all atoms around the nucleus",
        source: "https://www.britannica.com/science/electron"
    },
    ELASTICITY: {
        definition: "The ability of a material to return to its original shape and size after being stretched or compressed",
        source: "https://www.britannica.com/science/elasticity-physics"
    },
    ELEMENT: {
        definition: "A pure substance consisting of atoms with the same number of protons in their atomic nuclei",
        source: "https://www.britannica.com/science/chemical-element"
    },
    ENERGY: {
        definition: "The capacity to do work or cause physical change, existing in various forms that can be converted but not created or destroyed",
        source: "https://www.britannica.com/science/energy"
    },
    ENTANGLEMENT: {
        definition: "A quantum phenomenon where particles become correlated in such a way that the quantum state of each particle cannot be described independently",
        source: "https://www.nature.com/subjects/quantum-entanglement"
    },
    ENTROPY: {
        definition: "A measure of the disorder or randomness in a closed system. FORMULA: ΔS = Q/T",
        source: "https://www.britannica.com/science/entropy-physics"
    },
    ENZMYE: "Protein that catalyzes biological reactions",
    EROSION: {
        definition: "The gradual destruction and removal of rock or soil by natural processes such as wind, water, or ice",
        source: "https://www.nationalgeographic.org/encyclopedia/erosion"
    },
    FREQUENCY: {
        definition: "The number of occurrences of a repeating event per unit time. FORMULA: f = 1/T",
        source: "https://www.britannica.com/science/frequency-physics"
    },
    GALAXY: {
        definition: "A massive system of stars, gas, dust, and dark matter held together by gravity",
        source: "https://www.nasa.gov/universe/galaxies"
    },
    GENE: {
        definition: "A sequence of DNA that codes for a specific protein or functional RNA molecule",
        source: "https://www.genome.gov/genetics-glossary/Gene"
    },
    HEAT: {
        definition: "The transfer of thermal energy between objects due to temperature differences",
        source: "https://www.britannica.com/science/heat"
    },
    HEATCAPACITY: {
        definition: "Heat needed to raise temperature by one degree",
        source: "https://www.britannica.com/science/heat-capacity"
    },
    HYDROSPHERE: {
        definition: "All water on Earth",
        source: "https://www.britannica.com/science/hydrosphere"
    },
    INTERFERENCE: {
        definition: "Combination of waves to form resultant wave",
        source: "https://www.britannica.com/science/interference-physics"
    },
    LATENT: {
        definition: "Heat absorbed/released during phase change",
        source: "https://www.britannica.com/science/latent-heat"
    },
    LIGHT: {
        definition: "Electromagnetic radiation visible to human eye",
        source: "https://www.britannica.com/science/light"
    },
    LITHOSPHERE: {
        definition: "Rigid outer part of Earth",
        source: "https://www.britannica.com/science/lithosphere"
    },
    MEMBRANE: {
        definition: "Barrier around cells and organelles",
        source: "https://www.britannica.com/science/membrane-biology"
    },
    METEOR: {
        definition: "Space rock burning in Earth's atmosphere",
        source: "https://www.britannica.com/science/meteor-astronomy"
    },
    MINERAL: {
        definition: "Naturally occurring inorganic solid",
        source: "https://www.britannica.com/science/mineral"
    },
    MITOSIS: {
        definition: "Cell division for growth and repair",
        source: "https://www.britannica.com/science/mitosis"
    },
    MOLECULE: {
        definition: "Group of atoms bonded together",
        source: "https://www.britannica.com/science/molecule"
    },
    NEBULA: {
        definition: "Cloud of gas and dust where stars form",
        source: "https://www.britannica.com/science/nebula"
    },
    NEUTRON: {
        definition: "Neutral particle in atomic nuclei",
        source: "https://www.britannica.com/science/neutron"
    },
    OPTICS: {
        definition: "Study of light behavior and properties",
        source: "https://www.britannica.com/science/optics"
    },
    PARTICLEPHYSICS: {
        definition: "Study of fundamental particles and interactions",
        source: "https://www.britannica.com/science/particle-physics"
    },
    PLANCK: {
        definition: "Quantum of action in physics. FORMULA: E = hf",
        source: "https://www.britannica.com/biography/Max-Planck"
    },
    PLANET: {
        definition: "Celestial body orbiting a star",
        source: "https://www.britannica.com/science/planet"
    },
    POLARIZATION: {
        definition: "Restriction of wave oscillation to one plane",
        source: "https://www.britannica.com/science/polarization-physics"
    },
    PRESSURE: {
        definition: "Force applied per unit area. FORMULA: P = F/A",
        source: "https://www.britannica.com/science/pressure-physics"
    },
    PROTEIN: {
        definition: "Large molecules essential for life processes",
        source: "https://www.britannica.com/science/protein"
    },
    PROTON: {
        definition: "Positively charged particle in atomic nuclei",
        source: "https://www.britannica.com/science/proton"
    },
    PULSAR: {
        definition: "Rotating neutron star emitting radiation",
        source: "https://www.britannica.com/science/pulsar"
    },
    QUANTUM: {
        definition: "Smallest possible discrete unit of any physical property",
        source: "https://www.britannica.com/science/quantum-mechanics"
    },
    QUASAR: {
        definition: "Very bright galactic nucleus",
        source: "https://www.britannica.com/science/quasar"
    },
    RADIATION: {
        definition: "Heat transfer through electromagnetic waves",
        source: "https://www.britannica.com/science/radiation"
    },
    REACTION: {
        definition: "Process where substances change into new substances",
        source: "https://www.britannica.com/science/chemical-reaction"
    },
    REDSHIFT: {
        definition: "Wavelength increase from moving objects",
        source: "https://www.britannica.com/science/redshift"
    },
    REFLECTION: {
        definition: "Bouncing back of waves from a surface",
        source: "https://www.britannica.com/science/reflection-physics"
    },
    REFRACTION: {
        definition: "Bending of waves passing between media",
        source: "https://www.britannica.com/science/refraction"
    },
    RELATIVITY: {
        definition: "Einstein's theory relating space, time, mass, and energy",
        source: "https://www.britannica.com/science/relativity"
    },
    RNA: {
        definition: "Molecule involved in protein synthesis",
        source: "https://www.britannica.com/science/RNA"
    },
    SOLUTION: {
        definition: "Homogeneous mixture of substances",
        source: "https://www.britannica.com/science/solution-chemistry"
    },
    SUPERPOSITION: {
        definition: "Quantum state existing in multiple states simultaneously",
        source: "https://www.britannica.com/science/quantum-superposition"
    },
    SUPERNOVA: {
        definition: "Explosive death of massive star",
        source: "https://www.britannica.com/science/supernova"
    },
    TEMPERATURE: {
        definition: "Measure of average kinetic energy of particles",
        source: "https://www.britannica.com/science/temperature-physics"
    },
    THERMODYNAMICS: {
        definition: "Study of heat, energy, and their relationships",
        source: "https://www.britannica.com/science/thermodynamics"
    },
    TORQUE: {
        definition: "Rotational force. FORMULA: τ = r × F",
        source: "https://www.britannica.com/science/torque"
    },
    UNCERTAINTY: {
        definition: "Heisenberg's principle of position-momentum uncertainty",
        source: "https://www.britannica.com/science/uncertainty-principle"
    },
    WAVES: {
        definition: "A disturbance that transfers energy through matter or space",
        source: "https://www.britannica.com/science/wave-physics"
    },
    WAVELENGTH: {
        definition: "Distance between wave peaks. FORMULA: λ = v/f",
        source: "https://www.britannica.com/science/wavelength"
    },
    WEATHER: {
        definition: "Short-term atmospheric conditions",
        source: "https://www.britannica.com/science/weather-meteorology"
    },
    WORK: {
        definition: "The transfer of energy when a force moves an object. FORMULA: W = Fd",
        source: "https://www.britannica.com/science/work-physics"
    },

    //Biology Dictionary
    AEROBIC: {
        definition: "Depending on oxygen for survival or function.",
        source: "https://www.britannica.com/science/aerobic"
    },
    AGGLUTINATION: {
        definition: "The clumping of particles, such as blood cells or bacteria, in response to an antibody-antigen reaction.",
        source: "https://www.britannica.com/science/agglutination"
    },
    ALBINO: {
        definition: "A person with a congenital absence of pigmentation in the skin, eyes, and hair.",
        source: "https://www.britannica.com/science/albinism"
    },
    ALLELE: {
        definition: "One of two or more alternative forms of a gene that occupy the same position on homologous chromosomes.",
        source: "https://www.britannica.com/science/allele"
    },
    ANAEROBIC: {
        definition: "Requiring the absence of or not dependent on oxygen for survival or function.",
        source: "https://www.britannica.com/science/anaerobic"
    },
    ANTERIOR: {
        definition: "Located near or toward the head of an organism.",
        source: "https://www.britannica.com/science/anatomy"
    },
    ASEXUAL: {
        definition: "A form of reproduction that does not involve the fusion of male and female gametes.",
        source: "https://www.britannica.com/science/asexual-reproduction"
    },
    ASSIMILATION: {
        definition: "The process of converting digested food into protoplasm in an organism.",
        source: "https://www.britannica.com/science/assimilation"
    },
    BACTERIA: {
        definition: "Single-celled microorganisms that lack a nucleus and can be found in various environments.",
        source: "https://www.britannica.com/science/bacteria"
    },
    BINARYFISSION: {
        definition: "A form of asexual reproduction in which a single cell divides into two identical daughter cells.",
        source: "https://www.britannica.com/science/binary-fission"
    },
    BIOMASS: {
        definition: "The total mass of living organisms in a given area or ecosystem.",
        source: "https://www.britannica.com/science/biomass"
    },
    BLOOD: {
        definition: "A fluid that circulates through the body, supplying oxygen and nutrients while removing waste products.",
        source: "https://www.britannica.com/science/blood-biochemistry"
    },
    BLOODVESSEL: {
        definition: "A tubular structure that carries blood throughout the body (artery, vein, or capillary).",
        source: "https://www.britannica.com/science/blood-vessel"
    },
    BONE: {
        definition: "A rigid structure that makes up the skeleton of most vertebrates.",
        source: "https://www.britannica.com/science/bone-anatomy"
    },
    CELL: {
        definition: "The basic structural and functional unit of life in all living organisms.",
        source: "https://www.britannica.com/science/cell-biology"
    },
    CHROMOSOME: {
        definition: "A thread-like structure of DNA that contains genetic information.",
        source: "https://www.britannica.com/science/chromosome"
    },
    CIRCULATION: {
        definition: "The movement of blood through the body to supply oxygen and nutrients to tissues.",
        source: "https://www.britannica.com/science/circulation"
    },
    CIRCULATORYSYSTEM: {
        definition: "The system responsible for transporting blood and lymph throughout the body.",
        source: "https://www.britannica.com/science/circulatory-system"
    },
    CLONE: {
        definition: "A genetically identical copy of an organism, produced asexually.",
        source: "https://www.britannica.com/science/cloning"
    },
    CODOMINANT: {
        definition: "A genetic condition in which both alleles in a heterozygous organism are fully expressed in the phenotype.",
        source: "https://www.britannica.com/science/codominance"
    },
    DIGESTION: {
        definition: "The process of breaking down food into simpler molecules for absorption.",
        source: "https://www.britannica.com/science/digestion"
    },
    DNA: {
        definition: "The molecule that carries genetic information in living organisms.",
        source: "https://www.britannica.com/science/DNA"
    },
    EVOLUTION: {
        definition: "The process by which species gradually change over generations through natural selection.",
        source: "https://www.britannica.com/science/evolution-scientific-theory"
    },
    FERMENTATION: {
        definition: "A chemical process in which microorganisms break down substances, often producing energy without oxygen.",
        source: "https://www.britannica.com/science/fermentation"
    },
    FOSSIL: {
        definition: "The preserved remains or traces of ancient organisms.",
        source: "https://www.britannica.com/science/fossil"
    },
    GENETICS: {
        definition: "The study of heredity and the variation of inherited characteristics.",
        source: "https://www.britannica.com/science/genetics"
    },
    IMMUNESYSTEM: {
        definition: "The body's defense system against infections and diseases.",
        source: "https://www.britannica.com/science/immune-system"
    },
    METABOLISM: {
        definition: "The set of chemical reactions that occur within an organism to maintain life.",
        source: "https://www.britannica.com/science/metabolism"
    },
    MITOSIS: {
        definition: "A type of cell division that results in two identical daughter cells.",
        source: "https://www.britannica.com/science/mitosis"
    },
    PHOTOSYNTHESIS: {
        definition: "The process by which plants convert sunlight into energy.",
        source: "https://www.britannica.com/science/photosynthesis"
    },
    PROTEIN: {
        definition: "A macromolecule made of amino acids essential for growth and repair in organisms.",
        source: "https://www.britannica.com/science/protein"
    },
    RESPIRATION: {
        definition: "The process of breaking down glucose to release energy.",
        source: "https://www.britannica.com/science/cellular-respiration"
    },
    VACCINE: {
        definition: "A substance used to stimulate the immune system and provide immunity to diseases.",
        source: "https://www.britannica.com/science/vaccine"
    },
    VIRUS: {
        definition: "A microscopic infectious agent that replicates only inside a living host cell.",
        source: "https://www.britannica.com/science/virus"
    },
    VITAMINS: {
        definition: "Organic compounds essential for normal growth and metabolism.",
        source: "https://www.britannica.com/science/vitamin"
    },
    WBC: {
        definition: "White Blood Cell (WBC) is a type of blood cell that helps fight infections and diseases.",
        source: "https://www.britannica.com/science/white-blood-cell"
    },
    WATERCYCLE: {
        definition: "The continuous movement of water through the environment, including evaporation, condensation, and precipitation.",
        source: "https://www.britannica.com/science/hydrologic-cycle"
    },
    XYLEM: {
        definition: "A tissue in plants that transports water and nutrients from the roots to the leaves.",
        source: "https://www.britannica.com/science/xylem"
    },
    YEAST: {
        definition: "A type of fungus used in fermentation and baking.",
        source: "https://www.britannica.com/science/yeast-fungus"
    },
    YOLK: {
        definition: "The nutrient-rich part of an egg that provides food for a developing embryo.",
        source: "https://www.britannica.com/science/yolk-biology"
    },
    ZYGOTE: {
        definition: "A fertilized egg cell that will develop into an embryo.",
        source: "https://www.britannica.com/science/zygote"
    },
    ZOOPLANKTON: {
        definition: "Microscopic aquatic animals that drift in water and serve as food for larger organisms.",
        source: "https://www.britannica.com/science/zooplankton"
    },


     // Chemistry Dictionary




     ALCOHOL: {
        DEFINITION: 'A flammable liquid (C₂H₅OH) made by fermenting sugars, used in drinks, solvents, and chemical production.',
        SOURCE: 'https://www.britannica.com/science/alcohol'
    },
    ALKALI: {
        DEFINITION: 'A base that dissolves in water.',
        SOURCE: 'https://www.britannica.com/science/alkali'
    },
    ALKANE: {
        DEFINITION: 'A hydrocarbon with only single bonds, following the formula CₙH₂ₙ₊₂.',
        SOURCE: 'https://www.merriam-webster.com/dictionary/alkane'
    },


    ALLOTROPE: {
        DEFINITION: 'Different physical forms of the same element (e.g., diamond and graphite for carbon).',
        SOURCE: 'https://www.britannica.com/science/allotrope'
    },
    ALLOY: {
        DEFINITION: 'A mixture of metals (or metals with nonmetals) with different properties than pure metals (e.g., steel, brass).',
        SOURCE: 'https://www.britannica.com/technology/alloy'
    },
    ANALYSIS: {
        DEFINITION: 'Breaking a substance into its components to identify and measure them.',
        SOURCE: 'https://www.britannica.com/science/analysis-mathematics'
    },


    ANION: {
        DEFINITION: "A negatively charged ion; an ion that is attracted to the anode during electrolysis.",
        SOURCE: 'https://www.britannica.com/science/anion'
    },
    ANODE: {
        DEFINITION: "The positive electrode in an electrolytic cell.",
        SOURCE: 'https://www.britannica.com/technology/anode'
    },
    ATOMICMASS: {
        DEFINITION: "The mass of an isotope of an element in atomic mass units.",
        SOURCE: 'https://www.britannica.com/science/atomic-mass'
    },
    ATOMICNUMBER: {
        DEFINITION: "The number of protons in the nucleus of an atom of an element.",
        SOURCE: 'https://www.britannica.com/science/atomic-mass'
    },
    CARBOHYDRATE: {
        DEFINITION: "A large group of organic compounds, including sugars and polysaccharides, that serve as an important source of food and energy for animals.",
        SOURCE: 'https://www.britannica.com/science/carbohydrate'
    },
    CATHODE: {
        DEFINITION: "The negative electrode in an electrolytic cell.",
        SOURCE: 'https://www.britannica.com/science/carbohydrate'
    },
    CHAIN: {
        DEFINITION: "Two or more atoms or groups bonded together in a sequence.",
        SOURCE: 'https://www.britannica.com/science/chain-chemistry'
    },
    CHEMICALEQUATION: {
        DEFINITION: "A representation of a chemical reaction using symbols of the elements to indicate the amount of substance involved.",
        SOURCE: 'https://www.britannica.com/science/chemical-equation'
    },
    CHAINREACTION: {
        DEFINITION: "A process in which a neutron colliding with an atomic nucleus causes fission, leading to a self-sustaining series of reactions.",
        SOURCE: 'https://www.britannica.com/science/chain-reaction'
    },
    CHROMATOGRAPHY: {
        DEFINITION: "A technique for separating and analyzing the components of a mixture based on differential adsorption.",
        SOURCE: 'https://www.britannica.com/science/chromatography'
    },
    COMBUSTION: {
        DEFINITION: "A chemical process in which a substance reacts with oxygen to produce heat and light.",
        SOURCE: 'https://www.britannica.com/science/combustion'
    },
    CONCENTRATED: {
        DEFINITION: "Having had water removed to increase concentration.",
        SOURCE: 'https://www.britannica.com/dictionary/concentrated'
    },
    CONDENSATION: {
        DEFINITION: "A reaction in which two organic molecules combine to form a larger molecule along with a simple byproduct such as water.",
        SOURCE: 'https://www.britannica.com/dictionary/CONDENSATION'
    },
    CORROSION: {
        DEFINITION: "A process in which a solid, especially a metal, is eaten away and changed by a chemical action, as in the oxidation of iron.",
        SOURCE: 'https://www.britannica.com/science/corrosion'
    },
    CRYSTAL: {
        DEFINITION: "A solid substance with a regular shape in which atoms, ions, or molecules are arranged in a definite pattern.",
        SOURCE: 'https://www.britannica.com/science/crystal'
    },
    CRYSTALLIZATION: {
        DEFINITION: "The process by which crystals are formed from a liquid or a solution.",
        SOURCE: 'https://www.britannica.com/science/crystallization'
    },
    DIFFUSION: {
        DEFINITION: "The movement of particles from an area of higher concentration to an area of lower concentration.",
        SOURCE: 'https://www.britannica.com/science/diffusion'
    },
    DILUTE: {
        DEFINITION: "A solution that has a low concentration of solute or has been reduced in concentration.",
        SOURCE: 'https://www.britannica.com/dictionary/dilutev'
    },
    DISTILLATION: {
        DEFINITION: "The process of evaporating or boiling a liquid and condensing its vapor to separate components.",
        SOURCE: 'https://www.britannica.com/dictionary/DISTILLATION'
    },
    ELECTRODE: {
        DEFINITION: "An element in a semiconducting device that emits, collects, or controls the movement of electrons.",
        SOURCE: 'https://www.britannica.com/dictionary/ELECTRODE'
    },
    ELECTROLYSIS: {
        DEFINITION: "The conduction of electricity by a solution or melt, inducing chemical changes.",
        SOURCE: 'https://www.britannica.com/dictionary/ELECTROLYSIS'
    },
    ELECTROVALENCY: {
        DEFINITION: "The valency of a substance in forming ions, equal to the number of electrons gained or lost.",
        SOURCE: 'https://www.merriam-webster.com/dictionary/electrovalency'
    },
    EMULSION: {
        DEFINITION: "A light-sensitive coating on a base, such as paper or film, containing fine grains of silver bromide suspended in gelatin.",
        SOURCE: 'https://www.britannica.com/dictionary/EMULSION'
    },
    ESTERS: {
        DEFINITION: "A compound produced by the reaction between acids and alcohols with the elimination of water, often having a fragrant odor.",
        SOURCE: 'https://www.merriam-webster.com/dictionary/esters'
    },
    ETHER: {
        DEFINITION: "A colorless volatile highly flammable liquid with a characteristic sweetish odor, used as a solvent and anesthetic.",
        SOURCE: 'https://www.britannica.com/dictionary/ETHER'
    },
    EVAPORATION: {
        DEFINITION: 'The change of a liquid to a vapor, caused by an increase in temperature or a decrease in pressure.',
        SOURCE: 'https://www.britannica.com/dictionary/EVAPORATION'
    },
    FAT: {
        DEFINITION: "A class of naturally occurring soft greasy solids that serve as an energy reserve in living organisms.",
        SOURCE: 'https://www.britannica.com/dictionary/FAT'
    },
    FERMENTATION: {
        DEFINITION: "A chemical reaction in which a ferment causes an organic molecule to split into simpler substances, often producing alcohol.",
        SOURCE: 'https://www.britannica.com/dictionary/FERMENTATION'
    },
    FISSION: {
        DEFINITION: "The act or process of splitting or breaking into parts, such as nuclear fission.",
        SOURCE: 'https://www.britannica.com/dictionary/FERMENTATION'
    },
    GAS: {
        DEFINITION: "A substance that expands indefinitely to fill any container, with particles in rapid motion.",
        SOURCE: 'https://www.britannica.com/dictionary/GAS'
    },
    HYDROCARBON: {
        DEFINITION: "An organic compound containing only carbon and hydrogen.",
        SOURCE: 'https://www.britannica.com/dictionary/HYDROCARBON'
    },
    ION: {
        DEFINITION: "An electrically charged atom or group of atoms formed by the loss or gain of electrons.",
        SOURCE: 'https://www.britannica.com/dictionary/ION'
    },
    OPXIDIZE: {
        DEFINITION: "A process in which a substance combines with oxygen, often producing energy.",
        SOURCE: 'https://www.britannica.com/dictionary/OXIDATION'
    },
    PERIODICTABLE: {
        DEFINITION: "A table of elements arranged in order of increasing atomic number, highlighting their chemical properties.",
        SOURCE: 'https://www.britannica.com/dictionary/-PERIODIC-TABLE'
    },
    PH: {
        DEFINITION: "A measure of the acidity or alkalinity of a solution, where 7 is neutral, lower values are acidic, and higher values are alkaline.",
        SOURCE: 'https://www.britannica.com/dictionary/PH'
    },
    POLYMER: {
        DEFINITION: "A large molecule composed of repeating structural units.",
        SOURCE: 'https://www.britannica.com/dictionary/PH'
    },
    RADIOACTIVITY: {
        DEFINITION: "The spontaneous emission of radiation from atomic nuclei.",
        SOURCE: 'https://www.britannica.com/dictionary/RADIOACTIVITY'
    },
    SATURATED: {
        DEFINITION: "Containing the maximum amount of solute that can be dissolved at a given temperature and pressure.",
        SOURCE: 'https://www.britannica.com/dictionary/SATURATED'
    },
    SOLVENT: {
        DEFINITION: "A liquid capable of dissolving another substance.",
        SOURCE: 'https://www.britannica.com/dictionary/SOLVENT'
    },
    VALENCE: {
        DEFINITION: "The ability of an atom to combine with other atoms, determined by the number of electrons it can lose, gain, or share.",
        SOURCE: 'https://www.britannica.com/dictionary/VALENCY'
    },


    //PERIODIC TABLE
    HYDROGEN: {
        DEFINITION: 'is the most prevalent element in the cosmos and the third most plentiful element on the surface of the earth.',
        SOURCE: 'https://www.vedantu.com/jee-main/chemistry-hydrogen'
    },
    HELIUM: {
        DEFINITION: 'is a noble gas, the second most abundant element in the universe, and is commonly used in balloons, cryogenics, and as a protective gas in welding.',
        SOURCE: 'https://www.vedantu.com/chemistry/helium'
    },
    LITHIUM: {
        DEFINITION: 'is the lightest metal and an alkali metal, widely used in rechargeable batteries and mood-stabilizing medications.',
        SOURCE: 'https://www.vedantu.com/chemistry/lithium'
    },
    BERYLLIUM: {
        DEFINITION: 'is a lightweight, strong, steel-gray metal used in aerospace materials, X-ray windows, and alloys.',
        SOURCE: 'https://www.vedantu.com/chemistry/beryllium'
    },
    BORON: {
        DEFINITION: 'is a metalloid used in fiberglass, detergents, and as a semiconductor in electronic devices.',
        SOURCE: 'https://www.vedantu.com/chemistry/boron'
    },
    CARBON: {
        DEFINITION: 'is a nonmetal essential to life, found in all known life forms and used industrially in steel production and as graphite and diamond.',
        SOURCE: 'https://www.vedantu.com/chemistry/carbon'
    },
    NITROGEN: {
        DEFINITION: 'is a colorless, odorless gas that makes up around 78% of Earth’s atmosphere, crucial for biological molecules like DNA and proteins.',
        SOURCE: 'https://www.vedantu.com/chemistry/nitrogen-gas'
    },
    OXYGEN: {
        DEFINITION: 'is a colorless gas essential for respiration in living organisms and supports combustion.',
        SOURCE: 'https://www.vedantu.com/chemistry/oxygen'
    },
    FLUORINE: {
        DEFINITION: 'is a pale yellow, highly reactive gas used in toothpaste (as fluoride) and in the production of Teflon.',
        SOURCE: 'https://www.vedantu.com/chemistry/fluorine'
    },
    NEON: {
        DEFINITION: 'is a noble gas used primarily in advertising signs and high-voltage indicators due to its distinct reddish-orange glow.',
        SOURCE: 'https://www.vedantu.com/chemistry/neon'
    },
    SODIUM: {
        DEFINITION: 'is a soft, highly reactive metal used in table salt (sodium chloride) and in street lighting.',
        SOURCE: 'https://www.vedantu.com/chemistry/sodium'
    },
    MAGNESIUM: {
        DEFINITION: 'is a lightweight metal used in alloys, fireworks, and as an essential mineral in the human body.',
        SOURCE: 'https://www.vedantu.com/chemistry/magnesium'
    },
    ALUMINUM: {
        DEFINITION: 'is a lightweight, corrosion-resistant metal used in cans, aircraft, and construction materials.',
        SOURCE: 'https://www.vedantu.com/chemistry/aluminium'
    },
    SILICON: {
        DEFINITION: 'is a metalloid used widely in electronics as the primary material for semiconductors.',
        SOURCE: 'https://www.vedantu.com/chemistry/silicon'
    },
    PHOSPHORUS: {
        DEFINITION: 'is a reactive nonmetal used in fertilizers, detergents, and matches, essential to DNA and energy transfer in cells.',
        SOURCE: 'https://www.vedantu.com/chemistry/phosphorus'
    },
    SULFUR: {
        DEFINITION: 'is a yellow nonmetal used in sulfuric acid production, fertilizers, and vulcanization of rubber.',
        SOURCE: 'https://www.vedantu.com/chemistry/sulfur'
    },
    CHLORINE: {
        DEFINITION: 'is a greenish-yellow gas used in disinfectants, water treatment, and the production of plastics like PVC.',
        SOURCE: 'https://www.vedantu.com/chemistry/chlorine'
    },
    ARGON: {
        DEFINITION: 'is an inert noble gas used in welding, incandescent light bulbs, and to protect reactive materials.',
        SOURCE: 'https://www.vedantu.com/chemistry/argon'
    },
    POTASSIUM: {
        DEFINITION: 'is a soft, reactive metal essential for plant growth and human health, used in fertilizers and salts.',
        SOURCE: 'https://www.vedantu.com/chemistry/potassium'
    },
    CALCIUM: {
        DEFINITION: 'is a silvery-white metal vital for bones and teeth, and used in cement, steelmaking, and as a reducing agent.',
        SOURCE: 'https://www.vedantu.com/chemistry/calcium'
    },
    SCANDIUM: {
        DEFINITION: 'is a silvery-white transition metal often classified as a rare-earth element and used in aerospace alloys and metal halide lamps.',
        SOURCE: 'https://www.vedantu.com/chemistry/scandium'
    },
    TITANIUM: {
        DEFINITION: 'is a strong, lightweight metal known for its corrosion resistance, commonly used in aerospace, medical implants, and pigments.',
        SOURCE: 'https://www.vedantu.com/chemistry/titanium'
    },
    VANADIUM: {
        DEFINITION: 'is a transition metal used to produce high-strength steel alloys and as a catalyst in chemical reactions.',
        SOURCE: 'https://www.vedantu.com/chemistry/vanadium'
    },
    CHROMIUM: {
        DEFINITION: 'is a hard, lustrous metal known for its corrosion resistance, used in stainless steel and chrome plating.',
        SOURCE: 'https://www.vedantu.com/chemistry/chromium'
    },
    MANGANESE: {
        DEFINITION: 'is a gray-white metal used to improve the strength and hardness of steel and in batteries and fertilizers.',
        SOURCE: 'https://www.vedantu.com/chemistry/manganese'
    },
    IRON: {
        DEFINITION: 'is a versatile metal used widely in construction, manufacturing, and biological processes such as oxygen transport in hemoglobin.',
        SOURCE: 'https://www.vedantu.com/chemistry/iron'
    },
    COBALT: {
        DEFINITION: 'is a magnetic metal used in alloys, batteries, and pigments such as cobalt blue in glass and ceramics.',
        SOURCE: 'https://www.vedantu.com/chemistry/cobalt-chemical-element'
    },
    NICKEL: {
        DEFINITION: 'is a silvery-white metal known for its corrosion resistance and use in stainless steel, coins, and rechargeable batteries.',
        SOURCE: 'https://www.vedantu.com/chemistry/nickel'
    },
    COPPER: {
        DEFINITION: 'is a reddish-brown metal known for its excellent electrical and thermal conductivity, used in wiring, plumbing, and coinage.',
        SOURCE: 'https://www.vedantu.com/chemistry/copper'
    },
    ZINC: {
        DEFINITION: 'is a bluish-silver metal used in galvanization to protect steel from corrosion and as an essential trace element in biology.',
        SOURCE: 'https://www.vedantu.com/chemistry/zinc'
    },
    GALLIUM: {
        DEFINITION: 'is a soft metal with a low melting point, used in semiconductors, LEDs, and solar panels.',
        SOURCE: 'https://www.vedantu.com/chemistry/gallium'
    },
    GERMANIUM: {
        DEFINITION: 'is a lustrous metalloid used as a semiconductor in transistors, fiber optics, and infrared optics.',
        SOURCE: 'https://www.vedantu.com/chemistry/germanium'
    },
    ARSENIC: {
        DEFINITION: 'is a toxic metalloid used historically in pesticides, wood preservatives, and semiconductors.',
        SOURCE: 'https://www.vedantu.com/chemistry/arsenic'
    },
    SELENIUM: {
        DEFINITION: 'is a nonmetal used in glassmaking, electronics, and as an essential micronutrient with antioxidant properties.',
        SOURCE: 'https://www.vedantu.com/chemistry/selenium'
    },
    BROMINE: {
        DEFINITION: 'is a reddish-brown liquid halogen used in flame retardants, pharmaceuticals, and water treatment.',
        SOURCE: 'https://www.vedantu.com/chemistry/bromine'
    },
    KRYPTON: {
        DEFINITION: 'is a colorless, odorless noble gas used in lighting products, such as high-performance light bulbs and flash photography.',
        SOURCE: 'https://www.vedantu.com/chemistry/krypton'
    },
    RUBIDIUM: {
        DEFINITION: 'is a soft, silvery metal that is highly reactive and used in research, electronics, and specialty glasses.',
        SOURCE: 'https://www.vedantu.com/chemistry/rubidium'
    },
    STRONTIUM: {
        DEFINITION: 'is a soft, silver-yellow metal used in fireworks to create red flames and in producing ferrite magnets.',
        SOURCE: 'https://www.vedantu.com/chemistry/strontium'
    },
    YTTRIUM: {
        DEFINITION: 'is a silvery metal used in phosphors for LEDs and CRT displays, as well as in superconductors.',
        SOURCE: 'https://www.vedantu.com/chemistry/yttrium'
    },
    ZIRCONIUM: {
        DEFINITION: 'is a corrosion-resistant metal used in nuclear reactors, surgical instruments, and ceramics.',
        SOURCE: 'https://www.vedantu.com/chemistry/zirconium'
    },
    NIOBIUM: {
        DEFINITION: 'is a transition metal used in steel alloys to improve strength, and in superconducting materials.',
        SOURCE: 'https://www.vedantu.com/chemistry/niobium'
    },
    MOLYBDENUM: {
        DEFINITION: 'is a hard, silvery metal used to strengthen steel and in catalysts and lubricants.',
        SOURCE: 'https://www.vedantu.com/chemistry/molybdenum'
    },
    TECHNETIUM: {
        DEFINITION: 'is the first artificially produced element, used mainly in medical imaging as a radioactive tracer.',
        SOURCE: 'https://www.vedantu.com/chemistry/technetium'
    },
    RUTHENIUM: {
        DEFINITION: 'is a rare, hard metal used in electronics, as a catalyst, and to harden platinum and palladium alloys.',
        SOURCE: 'https://www.vedantu.com/chemistry/ruthenium'
    },
    RHODIUM: {
        DEFINITION: 'is a rare, reflective metal used in catalytic converters, jewelry, and as an alloying agent.',
        SOURCE: 'https://www.vedantu.com/chemistry/rhodium'
    },
    PALLADIUM: {
        DEFINITION: 'is a silvery-white metal used in catalytic converters, electronics, dentistry, and jewelry.',
        SOURCE: 'https://www.vedantu.com/chemistry/palladium'
    },
    SILVER: {
        DEFINITION: 'is a shiny metal known for its conductivity and use in jewelry, electronics, and photography.',
        SOURCE: 'https://www.vedantu.com/chemistry/silver'
    },
    CADMIUM: {
        DEFINITION: 'is a soft, bluish-white metal used in batteries, pigments, and as a neutron absorber in nuclear reactors.',
        SOURCE: 'https://www.vedantu.com/chemistry/cadmium'
    },
    INDIUM: {
        DEFINITION: 'is a soft metal used in touchscreens, LCDs, and solders due to its low melting point.',
        SOURCE: 'https://www.vedantu.com/chemistry/indium'
    },
    TIN: {
        DEFINITION: 'is a malleable metal used to coat other metals to prevent corrosion, and in alloys like bronze and solder.',
        SOURCE: 'https://www.vedantu.com/chemistry/tin'
    },
    ANTIMONY: {
        DEFINITION: 'is a brittle metalloid used in flame retardants, lead-acid batteries, and alloys.',
        SOURCE: 'https://www.vedantu.com/chemistry/antimony'
    },
    TELLURIUM: {
        DEFINITION: 'is a brittle metalloid used in alloys, semiconductors, and thermoelectric devices.',
        SOURCE: 'https://www.vedantu.com/chemistry/tellurium'
    },
    IODINE: {
        DEFINITION: 'is a dark purple solid halogen essential for thyroid health and used as a disinfectant and in pharmaceuticals.',
        SOURCE: 'https://www.vedantu.com/chemistry/iodine'
    },
    XENON: {
        DEFINITION: 'is a colorless, dense noble gas used in lighting, anesthesia, and ion propulsion systems for spacecraft.',
        SOURCE: 'https://www.vedantu.com/chemistry/xenon'
    },
    CESIUM: {
        DEFINITION: 'is a soft, gold-colored metal known for its use in atomic clocks and as a propellant in ion engines.',
        SOURCE: 'https://www.vedantu.com/chemistry/cesium'
    },
    BARIUM: {
        DEFINITION: 'is a soft, silvery alkaline earth metal used in medical imaging and fireworks.',
        SOURCE: 'https://www.vedantu.com/chemistry/barium'
    },
    LANTHANUM: {
        DEFINITION: 'is a soft, malleable rare-earth metal used in camera lenses, carbon arc lamps, and batteries.',
        SOURCE: 'https://www.vedantu.com/chemistry/lanthanum'
    },
    CERIUM: {
        DEFINITION: 'is a reactive rare-earth metal used in catalysts, alloys, and flints for lighters.',
        SOURCE: 'https://www.vedantu.com/chemistry/cerium'
    },
    PRASEODYMIUM: {
        DEFINITION: 'is a rare-earth metal used to create strong alloys and in aircraft engines and permanent magnets.',
        SOURCE: 'https://www.vedantu.com/chemistry/praseodymium'
    },
    NEODYMIUM: {
        DEFINITION: 'is a rare-earth metal used in strong permanent magnets, lasers, and glass coloring.',
        SOURCE: 'https://www.vedantu.com/chemistry/neodymium'
    },
    PROMETHIUM: {
        DEFINITION: 'is a radioactive rare-earth metal used in luminous paint, nuclear batteries, and research.',
        SOURCE: 'https://www.vedantu.com/chemistry/promethium'
    },
    SAMARIUM: {
        DEFINITION: 'is a rare-earth metal used in magnets, nuclear reactors, and as a neutron absorber.',
        SOURCE: 'https://www.vedantu.com/chemistry/samarium'
    },
    EUROPIUM: {
        DEFINITION: 'is a soft rare-earth metal used in phosphorescent materials for TV screens and fluorescent lamps.',
        SOURCE: 'https://www.vedantu.com/chemistry/europium'
    },
    GADOLINIUM: {
        DEFINITION: 'is a rare-earth metal used in MRI contrast agents, nuclear reactors, and phosphors.',
        SOURCE: 'https://www.vedantu.com/chemistry/gadolinium'
    },
    TERBIUM: {
        DEFINITION: 'is a rare-earth metal used in solid-state devices, lasers, and green phosphors in displays.',
        SOURCE: 'https://www.vedantu.com/chemistry/terbium'
    },
    DYSPROSIUM: {
        DEFINITION: 'is a rare-earth metal used in magnets, nuclear reactors, and data storage devices.',
        SOURCE: 'https://www.vedantu.com/chemistry/dysprosium'
    },
    HOLMIUM: {
        DEFINITION: 'is a rare-earth metal used in lasers, nuclear reactors, and to color glass and cubic zirconia.',
        SOURCE: 'https://www.vedantu.com/chemistry/holmium'
    },
    ERBIUM: {
        DEFINITION: 'is a rare-earth metal used in fiber-optic communication systems, lasers, and glass tinting.',
        SOURCE: 'https://www.vedantu.com/chemistry/erbium'
    },
    THULIUM: {
        DEFINITION: 'is a rare-earth metal used in lasers, portable X-ray machines, and electronic devices.',
        SOURCE: 'https://www.vedantu.com/chemistry/thulium'
    },
    YTTERBIUM: {
        DEFINITION: 'is a rare-earth metal used in lasers, atomic clocks, and as a dopant in stainless steel.',
        SOURCE: 'https://www.vedantu.com/chemistry/ytterbium'
    },
    LUTETIUM: {
        DEFINITION: 'is a rare-earth metal used in PET scan detectors, catalysts, and in cancer therapy.',
        SOURCE: 'https://www.vedantu.com/chemistry/lutetium'
    },
    HAFNIUM: {
        DEFINITION: 'is a corrosion-resistant metal used in nuclear control rods and high-temperature alloys.',
        SOURCE: 'https://www.vedantu.com/chemistry/hafnium'
    },
    TANTALUM: {
        DEFINITION: 'is a hard, blue-gray metal used in electronics, medical implants, and aerospace components.',
        SOURCE: 'https://www.vedantu.com/chemistry/tantalum'
    },
    TUNGSTEN: {
        DEFINITION: 'is a dense metal with the highest melting point, used in light bulb filaments and cutting tools.',
        SOURCE: 'https://www.vedantu.com/chemistry/tungsten'
    },
    RHENIUM: {
        DEFINITION: 'is a dense metal used in high-temperature superalloys, catalysts, and electrical contacts.',
        SOURCE: 'https://www.vedantu.com/chemistry/rhenium'
    },
    OSMIUM: {
        DEFINITION: 'is a hard, brittle metal with high density, used in fountain pen tips, electrical contacts, and alloys.',
        SOURCE: 'https://www.vedantu.com/chemistry/osmium'
    },
    IRIDIUM: {
        DEFINITION: 'is a corrosion-resistant metal used in spark plugs, crucibles, and deep-sea cables.',
        SOURCE: 'https://www.vedantu.com/chemistry/iridium'
    },
    PLATINUM: {
        DEFINITION: 'is a precious metal used in catalytic converters, jewelry, and laboratory equipment.',
        SOURCE: 'https://www.vedantu.com/chemistry/platinum'
    },
    GOLD: {
        DEFINITION: 'is a highly valued metal used in jewelry, electronics, and as a monetary standard.',
        SOURCE: 'https://www.vedantu.com/chemistry/gold'
    },
    MERCURY: {
        DEFINITION: 'is a liquid metal used in thermometers, barometers, and fluorescent lamps.',
        SOURCE: 'https://www.vedantu.com/chemistry/mercury'
    },
    THALLIUM: {
        DEFINITION: 'is a soft, toxic metal used in electronics, optics, and historically in rat poison.',
        SOURCE: 'https://www.vedantu.com/chemistry/thallium'
    },
    LEAD: {
        DEFINITION: 'is a heavy metal used in batteries, shielding against radiation, and historically in pipes and paints.',
        SOURCE: 'https://www.vedantu.com/chemistry/pb'
    },
    BISMUTH: {
        DEFINITION: 'is a brittle metal used in cosmetics, medicines, and as a replacement for lead in alloys.',
        SOURCE: 'https://www.vedantu.com/chemistry/bismuth'
    },
    POLONIUM: {
        DEFINITION: 'is a radioactive metalloid used in anti-static devices and as a heat source in space equipment.',
        SOURCE: 'https://www.vedantu.com/chemistry/polonium'
    },
    ASTATINE: {
        DEFINITION: 'is a rare, radioactive halogen with applications in cancer treatment research.',
        SOURCE: 'https://www.vedantu.com/chemistry/astatine'
    },
    RADON: {
        DEFINITION: 'is a radioactive noble gas that occurs naturally and is considered a health hazard in buildings.',
        SOURCE: 'https://www.vedantu.com/chemistry/radon'
    },
    FRANCIUM: {
        DEFINITION: 'is a highly radioactive alkali metal that occurs in trace amounts and is studied for research purposes.',
        SOURCE: 'https://www.vedantu.com/chemistry/francium'
    },
    RADIUM: {
        DEFINITION: 'is a radioactive metal historically used in luminous paints and now in cancer treatments.',
        SOURCE: 'https://www.vedantu.com/chemistry/radium'
    },
    ACTINIUM: {
        DEFINITION: 'is a radioactive element used as a neutron source and in radiation therapy.',
        SOURCE: 'https://www.vedantu.com/chemistry/actinium'
    },
    THORIUM: {
        DEFINITION: 'is a radioactive metal used in nuclear reactors and in producing high-quality lenses and heat-resistant ceramics.',
        SOURCE: 'https://www.vedantu.com/chemistry/thorium'
    },
    PROTACTINIUM: {
        DEFINITION: 'is a rare, radioactive metal used in scientific research and as a precursor in nuclear fuel.',
        SOURCE: 'https://www.vedantu.com/chemistry/protactinium'
    },
    URANIUM: {
        DEFINITION: 'is a heavy radioactive metal used as fuel in nuclear power plants and in military applications.',
        SOURCE: 'https://www.vedantu.com/chemistry/uranium'
    },
    NEPTUNIUM: {
        DEFINITION: 'is a radioactive actinide metal used in research and considered as a potential nuclear fuel.',
        SOURCE: 'https://www.vedantu.com/chemistry/neptunium'
    },
    PLUTONIUM: {
        DEFINITION: 'is a highly radioactive metal used in nuclear weapons and as a fuel in nuclear reactors.',
        SOURCE: 'https://www.vedantu.com/chemistry/plutonium'
    },
    AMERICIUM: {
        DEFINITION: 'is a synthetic radioactive metal used in smoke detectors and as a neutron source.',
        SOURCE: 'https://www.vedantu.com/chemistry/americium'
    },
    CURIUM: {
        DEFINITION: 'is a radioactive metal used in research and as a power source in space missions.',
        SOURCE: 'https://www.vedantu.com/chemistry/curium'
    },
    BERKELIUM: {
        DEFINITION: 'is a synthetic radioactive metal used in scientific research.',
        SOURCE: 'https://www.vedantu.com/chemistry/berkelium'
    },
    CALIFORNIUM: {
        DEFINITION: 'is a radioactive metal used in neutron moisture gauges and as a neutron source in research.',
        SOURCE: 'https://www.vedantu.com/chemistry/californium'
    },
    EINSTEINIUM: {
        DEFINITION: 'is a synthetic radioactive metal used for basic scientific research.',
        SOURCE: 'https://www.vedantu.com/chemistry/einsteinium'
    },
    FERMIUM: {
        DEFINITION: 'is a synthetic radioactive metal produced in nuclear reactors and used in research.',
        SOURCE: 'https://www.vedantu.com/chemistry/fermium'
    },
    MENDELEVIUM: {
        DEFINITION: 'is a synthetic element produced in particle accelerators and used in research.',
        SOURCE: 'https://www.vedantu.com/chemistry/mendelevium'
    },
    NOBELIUM: {
        DEFINITION: 'is a synthetic radioactive element used exclusively in scientific research.',
        SOURCE: 'https://www.vedantu.com/chemistry/nobelium'
    },
    LAWRENCIUM: {
        DEFINITION: 'is a synthetic element used in research to study the properties of heavy elements.',
        SOURCE: 'https://www.vedantu.com/chemistry/lawrencium'
    },
    RUTHERFORDIUM: {
        DEFINITION: 'is a synthetic element with limited applications, studied for its chemical properties.',
        SOURCE: 'https://www.vedantu.com/chemistry/rutherfordium'
    },
    DUBNIUM: {
        DEFINITION: 'is a synthetic radioactive element used only in scientific research.',
        SOURCE: 'https://www.vedantu.com/chemistry/dubnium'
    },
    SEABORGIUM: {
        DEFINITION: 'is a synthetic element studied for research on heavy elements.',
        SOURCE: 'https://www.vedantu.com/chemistry/seaborgium'
    },
    BOHRIUM: {
        DEFINITION: 'is a synthetic element produced in particle accelerators, used for scientific research.',
        SOURCE: 'https://www.vedantu.com/chemistry/bohrium'
    },
    HASSIUM: {
        DEFINITION: 'is a synthetic radioactive element used in research into the properties of heavy nuclei.',
        SOURCE: 'https://www.vedantu.com/chemistry/hassium'
    },
    MEITNERIUM: {
        DEFINITION: 'is a synthetic element with no practical applications outside of scientific research.',
        SOURCE: 'https://www.vedantu.com/chemistry/meitnerium'
    },
    DARMSTADTIUM: {
        DEFINITION: 'is a synthetic element created in labs and used for experimental research.',
        SOURCE: 'https://www.vedantu.com/chemistry/darmstadtium'
    },
    ROENTGENIUM: {
        DEFINITION: 'is a synthetic, highly radioactive element used in atomic research.',
        SOURCE: 'https://www.vedantu.com/chemistry/roentgenium'
    },
    COPERNICIUM: {
        DEFINITION: 'is a synthetic element studied to understand superheavy atoms.',
        SOURCE: 'https://www.vedantu.com/chemistry/copernicium'
    },
    NIHONIUM: {
        DEFINITION: 'is a synthetic element used in research, named after Japan.',
        SOURCE: 'https://www.vedantu.com/chemistry/nihonium'
    },
    FLEROVIUM: {
        DEFINITION: 'is a synthetic element studied for its properties as a superheavy metal.',
        SOURCE: 'https://www.vedantu.com/chemistry/flerovium'
    },
    MOSCOVIUM: {
        DEFINITION: 'is a synthetic element created in laboratories for research purposes.',
        SOURCE: 'https://www.vedantu.com/chemistry/moscovium'
    },
    LIVERMORIUM: {
        DEFINITION: 'is a synthetic radioactive element used in scientific research.',
        SOURCE: 'https://www.vedantu.com/chemistry/livermorium'
    },
    TENNESSINE: {
        DEFINITION: 'is a synthetic halogen used in research on superheavy elements.',
        SOURCE: 'https://www.vedantu.com/chemistry/tennessine'
    },
    OGANESSON: {
        DEFINITION: 'is a synthetic noble gas used in research on the limits of the periodic table.',
        SOURCE: 'https://www.vedantu.com/chemistry/oganesson'
    }
};


export default scienceTerms;
