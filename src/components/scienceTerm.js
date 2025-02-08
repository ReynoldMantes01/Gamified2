const scienceTerms = {
    // Physics - Mechanics
    ACCELERATION: "The rate of change of velocity over time. Formula: a = Δv/Δt",
    FORCE: "A push or pull that can change an object's motion or shape. Formula: F = ma",
    VELOCITY: "The speed of an object in a specific direction. Formula: v = Δx/Δt",
    MOMENTUM: "The quantity of motion of a moving body. Formula: p = mv",
    INERTIA: "The resistance of an object to changes in its state of motion",
    WORK: "The transfer of energy when a force moves an object. Formula: W = Fd",
    ENERGY: {
        definition: "The ability to do work or cause change. It can't be created or destroyed, only transformed! Common forms: kinetic, potential, thermal.",
        category: "Physics - Energy",
        link: "https://www.energy.gov/science-innovation/energy-basics",
        source: "U.S. Department of Energy"
    },
    PRESSURE: "Force applied per unit area. Formula: P = F/A",
    DENSITY: "Mass per unit volume of a substance. Formula: ρ = m/V",
    FRICTION: "Force that opposes motion between surfaces in contact",
    GRAVITY: {
        definition: "The force of attraction between all masses in the universe. On Earth, it's what keeps us on the ground! Formula: F = G(m₁m₂)/r²",
        category: "Physics - Forces",
        link: "https://spaceplace.nasa.gov/what-is-gravity/en/",
        source: "NASA Space Place"
    },
    TORQUE: "Rotational force. Formula: τ = r × F",
    ELASTICITY: "Property of returning to original shape after deformation",
    CENTRIPETAL: "Force directing motion in circular path. Formula: F = mv²/r",

    // Physics - Electricity & Magnetism
    CURRENTS: "The flow of electric charge through a conductor. Formula: I = V/R",
    ELECTRICFIELD: "Region where electric charges experience force. Formula: E = F/q",
    MAGNETICFIELD: "Region where magnetic materials experience force. Formula: B = F/qv",
    CAPACITOR: "Device that stores electric charge. Formula: C = Q/V",
    RESISTANCE: "Opposition to current flow. Formula: R = V/I",
    OHMSLAW: "Relationship between voltage, current, and resistance. Formula: V = IR",
    VOLTAGE: "Electric potential difference. Formula: V = W/q",
    INDUCTANCE: "Property of inducing voltage through changing magnetic field",
    TRANSFORMER: "Device that changes AC voltage using magnetic induction",
    SEMICONDUCTOR: "Material with conductivity between conductor and insulator",
    DIODE: "Electronic component allowing current flow in one direction",
    TRANSISTOR: "Device for amplifying or switching electronic signals",

    // Physics - Waves & Optics
    WAVES: {
        definition: "A disturbance that transfers energy through matter or space. Common examples include sound waves, light waves, and ocean waves.",
        category: "Physics - Waves",
        link: "https://www.physicsclassroom.com/class/waves",
        source: "Physics Classroom"
    },
    WAVELENGTH: "Distance between wave peaks. Formula: λ = v/f",
    FREQUENCY: "Wave cycles per second. Formula: f = 1/T",
    AMPLITUDE: "Maximum displacement from equilibrium position",
    REFLECTION: "Bouncing back of waves from a surface",
    REFRACTION: "Bending of waves passing between media",
    INTERFERENCE: "Combination of waves to form resultant wave",
    LIGHT: "Electromagnetic radiation visible to human eye",
    OPTICS: "Study of light behavior and properties",
    DIFFRACTION: "Bending of waves around obstacles",
    POLARIZATION: "Restriction of wave oscillation to one plane",
    DOPPLER: "Change in wave frequency due to relative motion",

    // Physics - Thermodynamics
    HEAT: "Transfer of thermal energy between objects",
    TEMPERATURE: "Measure of average kinetic energy of particles",
    THERMODYNAMICS: "Study of heat, energy, and their relationships",
    ENTROPY: "Measure of disorder in a system. Formula: ΔS = Q/T",
    HEATCAPACITY: "Heat needed to raise temperature by one degree",
    LATENT: "Heat absorbed/released during phase change",
    CONDUCTION: "Heat transfer through direct contact",
    CONVECTION: "Heat transfer through fluid movement",
    RADIATION: "Heat transfer through electromagnetic waves",
    CARNOT: "Ideal heat engine cycle efficiency. Formula: η = 1 - Tc/Th",
    
    // Physics - Modern Physics
    QUANTUM: "Smallest possible discrete unit of any physical property",
    RELATIVITY: "Einstein's theory relating space, time, mass, and energy",
    NUCLEARREACTION: "Process changing atomic nuclei structure",
    PARTICLEPHYSICS: "Study of fundamental particles and interactions",
    PLANCK: "Quantum of action in physics. Formula: E = hf",
    UNCERTAINTY: "Heisenberg's principle of position-momentum uncertainty",
    SUPERPOSITION: "Quantum state existing in multiple states simultaneously",
    ENTANGLEMENT: "Quantum correlation between particles",
    ANTIMATTER: "Matter with opposite properties of normal matter",

    // Chemistry - Atomic Structure
    ATOM: {
        definition: "The basic unit of matter, made up of protons, neutrons, and electrons. Everything you see is made of atoms!",
        category: "Chemistry - Atomic Structure",
        link: "https://www.rsc.org/periodic-table/atom",
        source: "Royal Society of Chemistry"
    },
    PROTON: "Positive particle in atomic nucleus",
    NEUTRON: "Neutral particle in atomic nucleus",
    ELECTRON: "Negative particle orbiting atomic nucleus",
    QUARK: "Fundamental particle in protons and neutrons",
    ISOTOPE: "Atoms with same protons but different neutrons",
    ORBITAL: "Region where electron is likely to be found",
    VALENCE: "Outer shell electrons involved in bonding",
    NUCLEUS: "Central core of atom containing protons and neutrons",

    // Chemistry - Chemical Reactions
    CATALYST: "Substance speeding up reaction without being consumed",
    REACTION: "Process where substances change into new substances",
    EQUILIBRIUM: "State where forward and reverse rates are equal",
    OXIDATION: "Loss of electrons in chemical reaction",
    REDUCTION: "Gain of electrons in chemical reaction",
    ACID: "Proton donor in chemical reactions",
    BASE: "Proton acceptor in chemical reactions",
    SALT: "Ionic compound from acid-base neutralization",
    PRECIPITATION: "Formation of solid from solution",
    HYDROLYSIS: "Decomposition of substance by water",
    SYNTHESIS: "Combination of elements to form compounds",
    DECOMPOSITION: "Breaking down of compounds into elements",

    // Chemistry - Organic Chemistry
    ALKANE: "Saturated hydrocarbon with single bonds",
    ALKENE: "Hydrocarbon with carbon-carbon double bond",
    ALKYNE: "Hydrocarbon with carbon-carbon triple bond",
    ALCOHOL: "Organic compound with -OH group",
    ETHER: "Organic compound with R-O-R linkage",
    ESTER: "Organic compound from acid and alcohol",
    KETONE: "Organic compound with carbonyl group",
    ALDEHYDE: "Organic compound with terminal carbonyl",
    POLYMER: "Large molecule made of repeating units",

    // Astronomy
    BLACKHOLE: "Region where gravity prevents light escape",
    GALAXY: "Large system of stars bound by gravity",
    NEBULA: "Cloud of gas and dust where stars form",
    SUPERNOVA: "Explosive death of massive star",
    PLANET: "Celestial body orbiting a star",
    ASTEROID: "Rocky object orbiting the Sun",
    COMET: "Icy body that produces gas tail near Sun",
    METEOR: "Space rock burning in Earth's atmosphere",
    PULSAR: "Rotating neutron star emitting radiation",
    QUASAR: "Very bright galactic nucleus",
    REDSHIFT: "Wavelength increase from moving objects",
    
    // Biology - Cell Biology
    CELL: {
        definition: "The smallest unit of life. Like a tiny factory, it contains different parts (organelles) that work together to keep organisms alive.",
        category: "Biology - Cell Biology",
        link: "https://www.khanacademy.org/science/biology/structure-of-a-cell",
        source: "Khan Academy"
    },
    MITOCHONDRIA: "Cell organelle producing energy (ATP)",
    NUCLEUS: "Control center containing genetic material",
    MEMBRANE: "Selective barrier around cells",
    DNA: {
        definition: "The molecule that carries genetic instructions for the development and functioning of living things. Shaped like a double helix!",
        category: "Biology - Genetics",
        link: "https://www.genome.gov/genetics-glossary/deoxyribonucleic-acid",
        source: "National Human Genome Research"
    },
    RIBOSOME: "Cellular machine for protein synthesis",
    GOLGI: "Organelle for protein processing and sorting",
    LYSOSOME: "Organelle containing digestive enzymes",
    CYTOSKELETON: "Cellular scaffolding for structure",
    ENDOCYTOSIS: "Process of taking material into cell",
    EXOCYTOSIS: "Process of expelling material from cell",

    // Biology - Systems
    PHOTOSYNTHESIS: "Process converting light to chemical energy",
    RESPIRATION: "Process breaking down nutrients for energy",
    DIGESTION: "Breaking down food into nutrients",
    CIRCULATION: "Movement of blood through body",
    NERVOUS: "System controlling body via electrical signals",
    ENDOCRINE: "Hormone-producing system",
    IMMUNE: "Defense system against pathogens",
    REPRODUCTIVE: "System for producing offspring",
    SKELETAL: "Framework supporting body structure",
    MUSCULAR: "System enabling body movement",

    // Biology - Genetics
    GENE: "Unit of heredity in DNA",
    CHROMOSOME: "Structure containing organized DNA",
    MUTATION: "Change in DNA sequence",
    HEREDITY: "Passing of traits from parents to offspring",
    ALLELE: "Alternative form of gene",
    PHENOTYPE: "Observable traits of organism",
    GENOTYPE: "Genetic makeup of organism",
    DOMINANT: "Trait expressed over recessive form",
    RECESSIVE: "Trait masked by dominant form",
    MEIOSIS: "Cell division for reproductive cells",
    MITOSIS: "Cell division for growth and repair",

    // Earth Science
    ATMOSPHERE: "Gaseous layer surrounding Earth",
    LITHOSPHERE: "Rigid outer part of Earth",
    HYDROSPHERE: "Water system of Earth",
    BIOSPHERE: "Life-containing layer of Earth",
    PLATE: "Section of Earth's crust",
    VOLCANO: "Opening where magma reaches surface",
    EARTHQUAKE: "Sudden release of energy in Earth's crust",
    CLIMATE: "Long-term weather patterns",
    WEATHER: "Short-term atmospheric conditions",
    EROSION: "Wearing away of Earth's surface",
    GLACIER: "Large mass of moving ice",
    MINERAL: "Naturally occurring inorganic solid"
};

export default scienceTerms;