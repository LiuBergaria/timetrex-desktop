const Punch: React.FC = () => {
    return (
        <div>
            <h1>Last punch today: -</h1>
            <div className="w-full mt-5">
                <button className="border rounded-lg px-4 py-2 w-full hover:bg-white hover:text-violet-900 transition">
                    Do punch
                </button>
            </div>
        </div>
    );
};

export default Punch;
