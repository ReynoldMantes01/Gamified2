const scienceTerms = {

    // Physics - Mechanics and Motion

    ACCELERATION: {
        DEFINITION: "The rate of change of velocity with respect to time. FORMULA: a = Δv/Δt",
        SOURCE: "https://www.britannica.com/science/acceleration"
    },
    VELOCITY: {
        DEFINITION: "The rate of change of position in a specific direction. FORMULA: v = Δx/Δt",
        SOURCE: "https://www.britannica.com/science/velocity"
    },
    FORCE: {
        DEFINITION: "A push or pull that can change an object's motion or shape. FORMULA: F = ma",
        SOURCE: "https://www.britannica.com/science/force-physics"
    },
    MOMENTUM: {
        DEFINITION: "The quantity of motion of a moving body, equal to the product of mass and velocity. FORMULA: p = mv",
        SOURCE: "https://www.britannica.com/science/momentum"
    },
    INERTIA: {
        DEFINITION: "The resistance of a physical object to any change in its velocity, including changes in speed or direction",
        SOURCE: "https://www.britannica.com/science/inertia"
    },
    GRAVITY: {
        DEFINITION: "The universal force of attraction between all masses. FORMULA: F = G(m₁m₂)/r²",
        SOURCE: "https://www.nasa.gov/universe/gravity"
    },
    FRICTION: {
        DEFINITION: "The force resisting relative motion between surfaces in contact. FORMULA: f = μN",
        SOURCE: "https://www.britannica.com/science/friction"
    },
    ACID: {
        DEFINITION: "Substance that produces H+ ions in solution",
        SOURCE: "https://www.britannica.com/science/acid"
    },
    AMPLITUDE: {
        DEFINITION: "Maximum displacement from equilibrium position",
        SOURCE: "https://www.britannica.com/science/amplitude"
    },
    ANTIMATTER: {
        DEFINITION: "Matter with opposite properties of normal matter",
        SOURCE: "https://www.britannica.com/science/antimatter"
    },
    ASTEROID: {
        DEFINITION: "Rocky object orbiting the Sun",
        SOURCE: "https://www.britannica.com/science/asteroid"
    },
    ATMOSPHERE: {
        DEFINITION: "Gaseous layer surrounding Earth",
        SOURCE: "https://www.britannica.com/science/atmosphere"
    },
    ATOM: {
        DEFINITION: "The basic unit of matter, made up of protons, neutrons, and electrons",
        SOURCE: "https://www.britannica.com/science/atom"
    },
    BASE: {
        DEFINITION: "Substance that produces OH- ions in solution",
        SOURCE: "https://www.britannica.com/science/base-chemistry"
    },
    BIOSPHERE: {
        DEFINITION: "All life on Earth",
        SOURCE: "https://www.britannica.com/science/biosphere"
    },
    BLACKHOLE: {
        DEFINITION: "Region where gravity prevents light escape",
        SOURCE: "https://www.britannica.com/science/black-hole"
    },
    BOND: {
        DEFINITION: "Force holding atoms together in molecules",
        SOURCE: "https://www.britannica.com/science/chemical-bond"
    },
    CARNOT: {
        DEFINITION: "Ideal heat engine cycle efficiency. FORMULA: η = 1 - Tc/Th",
        SOURCE: "https://www.britannica.com/science/Carnot-cycle"
    },
    CATALYST: {
        DEFINITION: "Substance that speeds up a reaction without being consumed",
        SOURCE: "https://www.britannica.com/science/catalyst"
    },
    CELL: {
        DEFINITION: "Basic unit of life",
        SOURCE: "https://www.britannica.com/science/cell-biology"
    },
    CENTRIPETAL: {
        DEFINITION: "Force directing motion in circular path. FORMULA: F = mv²/r",
        SOURCE: "https://www.britannica.com/science/centripetal-force"
    },
    CHROMOSOME: {
        DEFINITION: "Structure containing DNA",
        SOURCE: "https://www.britannica.com/science/chromosome"
    },
    CLIMATE: {
        DEFINITION: "Long-term weather patterns",
        SOURCE: "https://www.britannica.com/science/climate"
    },
    COMET: {
        DEFINITION: "Icy body that produces gas tail near Sun",
        SOURCE: "https://www.britannica.com/science/comet"
    },
    COMPOUND: {
        DEFINITION: "Substance made of different elements chemically combined",
        SOURCE: "https://www.britannica.com/science/chemical-compound"
    },
    CONDUCTION: {
        DEFINITION: "Heat transfer through direct contact",
        SOURCE: "https://www.britannica.com/science/conduction-heat-transfer"
    },
    CONVECTION: {
        DEFINITION: "The transfer of heat through a fluid (liquid or gas) by the movement of warmer and cooler fluid regions",
        SOURCE: "https://www.britannica.com/science/convection"
    },
    DENSITY: {
        DEFINITION: "The mass of a substance per unit volume. FORMULA: ρ = m/V",
        SOURCE: "https://www.britannica.com/science/density"
    },
    DIFFRACTION: {
        DEFINITION: "The bending of waves around obstacles or through openings, characteristic of all wave phenomena",
        SOURCE: "https://www.britannica.com/science/diffraction"
    },
    DNA: {
        DEFINITION: "A self-replicating material present in nearly all living organisms as the main constituent of chromosomes, carrying genetic information",
        SOURCE: "https://www.genome.gov/genetics-glossary/Deoxyribonucleic-Acid"
    },
    DOPPLER: {
        DEFINITION: "The change in frequency or wavelength of a wave for an observer moving relative to its source",
        SOURCE: "https://www.britannica.com/science/Doppler-effect"
    },
    ELECTRON: {
        DEFINITION: "A stable subatomic particle with a negative electric charge, found in all atoms around the nucleus",
        SOURCE: "https://www.britannica.com/science/electron"
    },
    ELASTICITY: {
        DEFINITION: "The ability of a material to return to its original shape and size after being stretched or compressed",
        SOURCE: "https://www.britannica.com/science/elasticity-physics"
    },
    ELEMENT: {
        DEFINITION: "A pure substance consisting of atoms with the same number of protons in their atomic nuclei",
        SOURCE: "https://www.britannica.com/science/chemical-element"
    },
    ENERGY: {
        DEFINITION: "The capacity to do work or cause physical change, existing in various forms that can be converted but not created or destroyed",
        SOURCE: "https://www.britannica.com/science/energy"
    },
    ENTANGLEMENT: {
        DEFINITION: "A quantum phenomenon where particles become correlated in such a way that the quantum state of each particle cannot be described independently",
        SOURCE: "https://www.nature.com/subjects/quantum-entanglement"
    },
    ENTROPY: {
        DEFINITION: "A measure of the disorder or randomness in a closed system. FORMULA: ΔS = Q/T",
        SOURCE: "https://www.britannica.com/science/entropy-physics"
    },
    ENZMYE: "Protein that catalyzes biological reactions",
    EROSION: {
        DEFINITION: "The gradual destruction and removal of rock or soil by natural processes such as wind, water, or ice",
        SOURCE: "https://www.nationalgeographic.org/encyclopedia/erosion"
    },
    FREQUENCY: {
        DEFINITION: "The number of occurrences of a repeating event per unit time. FORMULA: f = 1/T",
        SOURCE: "https://www.britannica.com/science/frequency-physics"
    },
    GALAXY: {
        DEFINITION: "A massive system of stars, gas, dust, and dark matter held together by gravity",
        SOURCE: "https://www.nasa.gov/universe/galaxies"
    },
    GENE: {
        DEFINITION: "A sequence of DNA that codes for a specific protein or functional RNA molecule",
        SOURCE: "https://www.genome.gov/genetics-glossary/Gene"
    },
    HEAT: {
        DEFINITION: "The transfer of thermal energy between objects due to temperature differences",
        SOURCE: "https://www.britannica.com/science/heat"
    },
    HEATCAPACITY: {
        DEFINITION: "Heat needed to raise temperature by one degree",
        SOURCE: "https://www.britannica.com/science/heat-capacity"
    },
    HYDROSPHERE: {
        DEFINITION: "All water on Earth",
        SOURCE: "https://www.britannica.com/science/hydrosphere"
    },
    INTERFERENCE: {
        DEFINITION: "Combination of waves to form resultant wave",
        SOURCE: "https://www.britannica.com/science/interference-physics"
    },
    LATENT: {
        DEFINITION: "Heat absorbed/released during phase change",
        SOURCE: "https://www.britannica.com/science/latent-heat"
    },
    LIGHT: {
        DEFINITION: "Electromagnetic radiation visible to human eye",
        SOURCE: "https://www.britannica.com/science/light"
    },
    LITHOSPHERE: {
        DEFINITION: "Rigid outer part of Earth",
        SOURCE: "https://www.britannica.com/science/lithosphere"
    },
    MEMBRANE: {
        DEFINITION: "Barrier around cells and organelles",
        SOURCE: "https://www.britannica.com/science/membrane-biology"
    },
    METEOR: {
        DEFINITION: "Space rock burning in Earth's atmosphere",
        SOURCE: "https://www.britannica.com/science/meteor-astronomy"
    },
    MINERAL: {
        DEFINITION: "Naturally occurring inorganic solid",
        SOURCE: "https://www.britannica.com/science/mineral"
    },
    MITOSIS: {
        DEFINITION: "Cell division for growth and repair",
        SOURCE: "https://www.britannica.com/science/mitosis"
    },
    MOLECULE: {
        DEFINITION: "Group of atoms bonded together",
        SOURCE: "https://www.britannica.com/science/molecule"
    },
    NEBULA: {
        DEFINITION: "Cloud of gas and dust where stars form",
        SOURCE: "https://www.britannica.com/science/nebula"
    },
    NEUTRON: {
        DEFINITION: "Neutral particle in atomic nuclei",
        SOURCE: "https://www.britannica.com/science/neutron"
    },
    OPTICS: {
        DEFINITION: "Study of light behavior and properties",
        SOURCE: "https://www.britannica.com/science/optics"
    },
    PARTICLEPHYSICS: {
        DEFINITION: "Study of fundamental particles and interactions",
        SOURCE: "https://www.britannica.com/science/particle-physics"
    },
    PLANCK: {
        DEFINITION: "Quantum of action in physics. FORMULA: E = hf",
        SOURCE: "https://www.britannica.com/biography/Max-Planck"
    },
    PLANET: {
        DEFINITION: "Celestial body orbiting a star",
        SOURCE: "https://www.britannica.com/science/planet"
    },
    POLARIZATION: {
        DEFINITION: "Restriction of wave oscillation to one plane",
        SOURCE: "https://www.britannica.com/science/polarization-physics"
    },
    PRESSURE: {
        DEFINITION: "Force applied per unit area. FORMULA: P = F/A",
        SOURCE: "https://www.britannica.com/science/pressure-physics"
    },
    PROTEIN: {
        DEFINITION: "Large molecules essential for life processes",
        SOURCE: "https://www.britannica.com/science/protein"
    },
    PROTON: {
        DEFINITION: "Positively charged particle in atomic nuclei",
        SOURCE: "https://www.britannica.com/science/proton"
    },
    PULSAR: {
        DEFINITION: "Rotating neutron star emitting radiation",
        SOURCE: "https://www.britannica.com/science/pulsar"
    },
    QUANTUM: {
        DEFINITION: "Smallest possible discrete unit of any physical property",
        SOURCE: "https://www.britannica.com/science/quantum-mechanics"
    },
    QUASAR: {
        DEFINITION: "Very bright galactic nucleus",
        SOURCE: "https://www.britannica.com/science/quasar"
    },
    RADIATION: {
        DEFINITION: "Heat transfer through electromagnetic waves",
        SOURCE: "https://www.britannica.com/science/radiation"
    },
    REACTION: {
        DEFINITION: "Process where substances change into new substances",
        SOURCE: "https://www.britannica.com/science/chemical-reaction"
    },
    REDSHIFT: {
        DEFINITION: "Wavelength increase from moving objects",
        SOURCE: "https://www.britannica.com/science/redshift"
    },
    REFLECTION: {
        DEFINITION: "Bouncing back of waves from a surface",
        SOURCE: "https://www.britannica.com/science/reflection-physics"
    },
    REFRACTION: {
        DEFINITION: "Bending of waves passing between media",
        SOURCE: "https://www.britannica.com/science/refraction"
    },
    RELATIVITY: {
        DEFINITION: "Einstein's theory relating space, time, mass, and energy",
        SOURCE: "https://www.britannica.com/science/relativity"
    },
    RNA: {
        DEFINITION: "Molecule involved in protein synthesis",
        SOURCE: "https://www.britannica.com/science/RNA"
    },
    SOLUTION: {
        DEFINITION: "Homogeneous mixture of substances",
        SOURCE: "https://www.britannica.com/science/solution-chemistry"
    },
    SUPERPOSITION: {
        DEFINITION: "Quantum state existing in multiple states simultaneously",
        SOURCE: "https://www.britannica.com/science/quantum-superposition"
    },
    SUPERNOVA: {
        DEFINITION: "Explosive death of massive star",
        SOURCE: "https://www.britannica.com/science/supernova"
    },
    TEMPERATURE: {
        DEFINITION: "Measure of average kinetic energy of particles",
        SOURCE: "https://www.britannica.com/science/temperature-physics"
    },
    THERMODYNAMICS: {
        DEFINITION: "Study of heat, energy, and their relationships",
        SOURCE: "https://www.britannica.com/science/thermodynamics"
    },
    TORQUE: {
        DEFINITION: "Rotational force. FORMULA: τ = r × F",
        SOURCE: "https://www.britannica.com/science/torque"
    },
    UNCERTAINTY: {
        DEFINITION: "Heisenberg's principle of position-momentum uncertainty",
        SOURCE: "https://www.britannica.com/science/uncertainty-principle"
    },
    WAVES: {
        DEFINITION: "A disturbance that transfers energy through matter or space",
        SOURCE: "https://www.britannica.com/science/wave-physics"
    },
    WAVELENGTH: {
        DEFINITION: "Distance between wave peaks. FORMULA: λ = v/f",
        SOURCE: "https://www.britannica.com/science/wavelength"
    },
    WEATHER: {
        DEFINITION: "Short-term atmospheric conditions",
        SOURCE: "https://www.britannica.com/science/weather-meteorology"
    },
    WORK: {
        DEFINITION: "The transfer of energy when a force moves an object. FORMULA: W = Fd",
        SOURCE: "https://www.britannica.com/science/work-physics"
    },

    //Chemistry Dictionary

    AEROBIC: "Depending on oxygen for survival or function.",
    AGGLUTINATION: "The clumping of particles, such as blood cells or bacteria, in response to an antibody-antigen reaction.",
    ALBINO: "A person with a congenital absence of pigmentation in the skin, eyes, and hair.",
    ALLELE: "One of two or more alternative forms of a gene that occupy the same position on homologous chromosomes.",
    ANAEROBIC: "Requiring the absence of or not dependent on oxygen for survival or function.",
    ANTERIOR: "Located near or toward the head of an organism.",
    ASEXUAL: "A form of reproduction that does not involve the fusion of male and female gametes.",
    ASSIMILATION: "The process of converting digested food into protoplasm in an organism.",
    BACTERIA: "Single-celled microorganisms that lack a nucleus and can be found in various environments.",
    BINARYFISSION: "A form of asexual reproduction in which a single cell divides into two identical daughter cells.",
    BIOMASS: "The total mass of living organisms in a given area or ecosystem.",
    BLOOD: "A fluid that circulates through the body, supplying oxygen and nutrients while removing waste products.",
    BLOODVESSEL: "A tubular structure that carries blood throughout the body (artery, vein, or capillary).",
    BONE: "A rigid structure that makes up the skeleton of most vertebrates.",
    CELL: "The basic structural and functional unit of life in all living organisms.",
    CHROMOSOME: "A thread-like structure of DNA that contains genetic information.",
    CIRCULATION: "The movement of blood through the body to supply oxygen and nutrients to tissues.",
    CIRCULATORYSYSTEM: "The system responsible for transporting blood and lymph throughout the body.",
    CLASS: "A taxonomic category that ranks above order and below phylum.",
    CLONE: "A genetically identical copy of an organism, produced asexually.",
    CODOMINANT: "A genetic condition in which both alleles in a heterozygous organism are fully expressed in the phenotype.",
    COLDBLOODED: "An animal whose body temperature changes with its environment.",
    CONCEPTION: "The process of fertilization, where a sperm cell joins an egg cell.",
    COPULATE: "To engage in sexual reproduction.",
    CYTOPLASM: "The fluid within a cell that surrounds the nucleus and contains organelles.",
    DIGESTION: "The process of breaking down food into simpler molecules for absorption.",
    DIPLOID: "A cell or organism containing two sets of homologous chromosomes.",
    DIVISION: "A taxonomic rank used in the classification of plants, equivalent to a phylum in animals.",
    DOMINANT: "A genetic trait that is expressed even when only one copy of the allele is present.",
    DORSAL: "Relating to the back or upper side of an organism.",
    ECOSYSTEM: "A community of organisms interacting with each other and their environment.",
    EGG: "A female reproductive cell, or ovum, capable of being fertilized.",
    EMBRYO: "An early stage of development in multicellular organisms.",
    ENVIRONMENT: "The external surroundings that influence an organism's growth and behavior.",
    ENZYME: "A protein that speeds up chemical reactions in living organisms.",
    EPIDERMIS: "The outermost layer of skin or cells in an organism.",
    EVOLUTION: "The process by which species gradually change over generations through natural selection.",
    EXCRETION: "The process of eliminating waste materials from an organism.",
    FERMENTATION: "A chemical process in which microorganisms break down substances, often producing energy without oxygen.",
    FERTILIZATION: "The fusion of a sperm and an egg cell to form a zygote.",
    FLOWER: "The reproductive structure of flowering plants.",
    FETUS: "A developing mammal after the embryonic stage, typically from two months until birth in humans.",
    FOODCHAIN: "A sequence of organisms in an ecosystem where each one is a source of energy for the next.",
    FOSSIL: "The preserved remains or traces of ancient organisms.",
    FRUIT: "The mature ovary of a flowering plant, often containing seeds.",
    FUNGUS: "A kingdom of organisms that lack chlorophyll and obtain nutrients by decomposing organic material.",
    GAMETE: "A reproductive cell (sperm or egg) that contains half the normal number of chromosomes.",
    GENE: "A segment of DNA that codes for a specific protein and determines hereditary traits.",
    GENUS: "A taxonomic category ranking above species and below family.",
    GERMINATION: "The process by which a seed develops into a new plant.",
    GESTATION: "The period of development from conception to birth in mammals.",
    GLAND: "An organ that produces and secretes substances like hormones or enzymes.",
    GONAD: "A reproductive organ (testis or ovary) that produces gametes.",
    GROWTH: "The increase in size or number of cells in an organism over time.",
    HAPLOID: "A cell or organism with a single set of chromosomes, typically found in gametes.",
    HEREDITY: "The transmission of genetic traits from parents to offspring.",
    HERMAPHRODITE: "An organism that has both male and female reproductive organs.",
    HORMONE: "A chemical messenger produced by glands that regulates various bodily functions.",
    HYBRID: "An organism resulting from the crossbreeding of different species or genetic varieties.",
    IMMUNESYSTEM: "The body's defense system against infections and diseases.",
    INGESTION: "The process of taking in food or drink into the body.",
    INSTINCT: "An inborn pattern of behavior that occurs naturally in response to stimuli.",
    INVERTEBRATE: "An animal without a backbone.",
    IRIS: "The colored part of the eye that controls the size of the pupil.",
    JOINT: "The point where two bones meet, allowing movement.",
    KIDNEY: "An organ that filters waste from the blood and produces urine.",
    KINGDOM: "The highest taxonomic rank used in the classification of organisms.",
    LARVA: "An immature stage of development in some animals, usually different in form from the adult.",
    LATERAL: "Relating to the side of an organism or body part.",
    LIFECYCLE: "The series of stages an organism goes through from birth to reproduction to death.",
    LIGAMENT: "A band of tissue that connects bones or supports organs.",
    LIVER: "A vital organ that detoxifies chemicals, metabolizes nutrients, and produces bile.",
    LUNGS: "Organs responsible for gas exchange, bringing oxygen into the body and expelling carbon dioxide.",
    MEIOSIS: "A type of cell division that reduces chromosome number by half, producing gametes.",
    MEMBRANE: "A thin layer of tissue that covers a surface or separates spaces.",
    METABOLISM: "The set of chemical reactions that occur within an organism to maintain life.",
    MICROORGANISM: "A tiny living organism, such as bacteria or fungi, that can only be seen under a microscope.",
    MITOSIS: "A type of cell division that results in two identical daughter cells.",
    MOLECULE: "The smallest unit of a chemical compound that retains its properties.",
    MUSCLE: "A tissue that contracts to produce movement in the body.",
    MUTATION: "A change in the genetic sequence of an organism, which can lead to variations in traits.",
    NERVE: "A bundle of fibers that transmits signals between the brain and the body.",
    NEUROTRANSMITTER: "A chemical that transmits signals between nerve cells.",
    NUCLEUS: "The organelle in a cell that contains genetic material (DNA) and controls cell functions.",
    NUTRIENT: "A substance essential for growth, energy, and overall health in an organism.",
    OMNIVORE: "An organism that eats both plants and animals.",
    ORGAN: "A group of tissues working together to perform a specific function in the body.",
    ORGANISM: "Any living thing, from bacteria to humans.",
    OVARY: "The female reproductive organ that produces eggs and hormones.",
    OXYGEN: "A gas essential for respiration in most living organisms.",
    PARASITE: "An organism that lives on or inside another organism and derives nutrients at the host’s expense.",
    PATHOGEN: "A microorganism, such as a virus or bacteria, that causes disease.",
    PHOTOSYNTHESIS: "The process by which plants convert sunlight into energy.",
    PLACENTA: "An organ in pregnant mammals that nourishes and maintains the fetus.",
    PLASMA: "The liquid portion of blood that carries cells and nutrients.",
    POLLINATION: "The transfer of pollen from one flower to another, enabling fertilization.",
    PREDATOR: "An organism that hunts and consumes other organisms for food.",
    PROTEIN: "A macromolecule made of amino acids essential for growth and repair in organisms.",
    PUBERTY: "The stage of human development where sexual maturity is reached.",
    PUPIL: "The opening in the eye that controls the amount of light entering.",
    QUADRICEPS: "A large muscle group at the front of the thigh, responsible for extending the leg.",
    REPRODUCTION: "The biological process by which new organisms are produced.",
    RESPIRATION: "The process of breaking down glucose to release energy.",
    RIBOSOME: "A cell structure that synthesizes proteins.",
    SALIVA: "A digestive fluid produced in the mouth that helps break down food.",
    SKELETALSYSTEM: "The system of bones that supports and protects the body.",
    SPECIES: "A group of similar organisms capable of interbreeding and producing fertile offspring.",
    SPINALCORD: "A bundle of nerves running down the back that transmits signals between the brain and body.",
    STIMULUS: "A change in the environment that triggers a response in an organism.",
    SYMBIOSIS: "A close and often long-term interaction between two different species.",
    TENDON: "A flexible but strong tissue that connects muscles to bones.",
    TISSUE: "A group of similar cells working together to perform a function.",
    TRANSPIRATION: "The process by which plants release water vapor through their leaves.",
    TROPHICLEVEL: "A position in a food chain that indicates an organism’s energy source.",
    UREA: "A waste product formed in the liver and excreted in urine.",
    UTERUS: "The organ in female mammals where the embryo develops during pregnancy.",
    URINARYSYSTEM: "The system responsible for filtering waste from the blood and producing urine.",
    VACCINE: "A substance used to stimulate the immune system and provide immunity to diseases.",
    VASCULARSYSTEM: "A network of vessels (such as blood or lymph vessels) that transport fluids throughout the body.",
    VEIN: "A blood vessel that carries blood toward the heart.",
    VERTEBRAE: "The bones that form the backbone.",
    VIRUS: "A microscopic infectious agent that replicates only inside a living host cell.",
    VITAMINS: "Organic compounds essential for normal growth and metabolism.",
    WBC: "WhiteBloodCell (WBC) A type of blood cell that helps fight infections and diseases.",
    WATERCYCLE: "The continuous movement of water through the environment, including evaporation, condensation, and precipitation.",
    XYLEM: "A tissue in plants that transports water and nutrients from the roots to the leaves.",
    YEAST: "A type of fungus used in fermentation and baking.",
    YOLK: "The nutrient-rich part of an egg that provides food for a developing embryo.",
    ZYGOTE: "A fertilized egg cell that will develop into an embryo.",
    ZOOPLANKTON: "Microscopic aquatic animals that drift in water and serve as food for larger organisms.",

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