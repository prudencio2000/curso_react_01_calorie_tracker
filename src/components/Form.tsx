import { categories } from "../data/category";

export default function Form() {
    return (
        <form
            className="space-y-5 bg-white p-10 rounded-lg shadow"
        >
            <div className="grid gird-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoría:</label>
                <select
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    id="category"
                >
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}

                </select>
            </div>
            <div className="grid gird-cols-1 gap-3">
                <label htmlFor="activity" className="font-bold">Categoría:</label>
                <input id="activity" type= "text"  className="border border-slate-300 p-2 rounded-lg w-full bg-white" placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio , Pesas, Biciclestas"/>
            </div>
            <div className="grid gird-cols-1 gap-3">
                <label htmlFor="colories" className="font-bold">Calorias:</label>
                <input id="colories" type= "number"  className="border border-slate-300 p-2 rounded-lg w-full bg-white" placeholder="Calorias ej. 200 o 300"/>
            </div>
            <input
                type="submit"
                value="Guardar Comida o Guardar Ejercicio"
                className="bg-gray-800 hover:bg-gray-900  w-full p-2 font-bold uppercase text-white cursor-pointer"
            >
            </input>
        </form>
    )
}
