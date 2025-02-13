interface Props extends React.InputHTMLAttributes<HTMLInputElement>{}
export function Input (props:Props){
    return(
        <input
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...props}
            />
    );
}
export default Input;