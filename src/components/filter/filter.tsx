interface FilterProps {
    filter: string;
    setFilter: (value: React.SetStateAction<string>) => void
}

export const Filter: React.FC<FilterProps> = ({ filter, setFilter }) => {
    return (
        <div className="filter-container">
            <div className="counter-container">
                <div className="counter">100</div>
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Filtrar podcasts..."
                    className="w-100 filter d-inline"
                />
            </div>
        </div>

    )
}
