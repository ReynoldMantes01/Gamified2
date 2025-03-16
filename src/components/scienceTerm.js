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


    // Chemnistry Dictionary

    ALCOHOL: 'A flammable liquid (C₂H₅OH) made by fermenting sugars, used in drinks, solvents, and chemical production.',
    ALKALI: 'A base that dissolves in water.',
    ALKANE: 'A hydrocarbon with only single bonds, following the formula CₙH₂ₙ₊₂.',
    ALLOTROPE: 'Different physical forms of the same element (e.g., diamond and graphite for carbon).',
    ALLOY: 'A mixture of metals (or metals with nonmetals) with different properties than pure metals (e.g., steel, brass).',
    ANALYSIS: 'Breaking a substance into its components to identify and measure them.',
    ANION: "A negatively charged ion; an ion that is attracted to the anode during electrolysis.",
    ANODE: "The positive electrode in an electrolytic cell.",
    ATOMICMASS: "The mass of an isotope of an element in atomic mass units.",
    ATOMICNUMBER: "The number of protons in the nucleus of an atom of an element.",
    CARBOHYDRATE: "A large group of organic compounds, including sugars and polysaccharides, that serve as an important source of food and energy for animals.",
    CATHODE: "The negative electrode in an electrolytic cell.",
    CATION: "A positively charged ion; an ion that is attracted to the cathode during electrolysis.",
    CHAIN: "Two or more atoms or groups bonded together in a sequence.",
    CHEMICALEQUATION: "A representation of a chemical reaction using symbols of the elements to indicate the amount of substance involved.",
    CHAINREACTION: "A process in which a neutron colliding with an atomic nucleus causes fission, leading to a self-sustaining series of reactions.",
    CHROMATOGRAPHY: "A technique for separating and analyzing the components of a mixture based on differential adsorption.",
    COMBUSTION: "A chemical process in which a substance reacts with oxygen to produce heat and light.",
    CONCENTRATED: "Having had water removed to increase concentration.",
    CONDENSATION: "A reaction in which two organic molecules combine to form a larger molecule along with a simple byproduct such as water.",
    CORROSION: "A process in which a solid, especially a metal, is eaten away and changed by a chemical action, as in the oxidation of iron.",
    CRYSTAL: "A solid substance with a regular shape in which atoms, ions, or molecules are arranged in a definite pattern.",
    CRYSTALLIZATION: "The process by which crystals are formed from a liquid or a solution.",
    DIFFUSION: "The movement of particles from an area of higher concentration to an area of lower concentration.",
    DILUTE: "A solution that has a low concentration of solute or has been reduced in concentration.",
    DISTILLATION: "The process of evaporating or boiling a liquid and condensing its vapor to separate components.",
    ELECTRODE: "An element in a semiconducting device that emits, collects, or controls the movemt of electrons.",
    ELECTROLYSIS: "The conduction of electricity by a solution or melt, inducing chemical changes.",
    ELECTROVALENCY: "The valency of a substance in forming ions, equal to the number of electrons gained or lost.",
    EMULSION: "A light-sensitive coating on a base, such as paper or film, containing fine grains of silver bromide suspended in gelatin.",
    ESTER: "A compound produced by the reaction between acids and alcohols with the elimination of water, often having a fragrant odor.",
    ETHER: "A colorless volatile highly flammable liquid with a characteristic sweetish odor, used as a solvent and anesthetic.",
    EVAPORATION: "The change of a liquid to a vapor, caused by an increase in temperature or a decrease in pressure.",
    FAT: "A class of naturally occurring soft greasy solids that serve as an energy reserve in living organisms.",
    FERMENTATION: "A chemical reaction in which a ferment causes an organic molecule to split into simpler substances, often producing alcohol.",
    FISSION: "The act or process of splitting or breaking into parts, such as nuclear fission.",
    GAS: "A substance that expands indefinitely to fill any container, with particles in rapid motion.",
    HYDROCARBON: "An organic compound containing only carbon and hydrogen.",
    ION: "An electrically charged atom or group of atoms formed by the loss or gain of electrons.",
    OXIDATION: "A process in which a substance combines with oxygen, often producing energy.",
    PERIODICTABLE: "A table of elements arranged in order of increasing atomic number, highlighting their chemical properties.",
    PH: "A measure of the acidity or alkalinity of a solution, where 7 is neutral, lower values are acidic, and higher values are alkaline.",
    POLYMER: "A large molecule composed of repeating structural units.",
    RADIOACTIVITY: "The spontaneous emission of radiation from atomic nuclei.",
    SATURATED: "Containing the maximum amount of solute that can be dissolved at a given temperature and pressure.",
    SOLVENT: "A liquid capable of dissolving another substance.",
    VALENCY: "The ability of an atom to combine with other atoms, determined by the number of electrons it can lose, gain, or share.",
};


export default scienceTerms;