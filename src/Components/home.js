import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-8">Clickable Options</h1>
            <ul className="space-y-4">
                <li>
                    <Link to="/uniqueword">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Unique Word
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/synonym">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Synonym
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/masking">
                        <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                            Masking
                        </button>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Home;
