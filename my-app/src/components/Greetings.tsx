interface Props{
    name: string;
    age: number;
}

const Greeting: React.FC<Props> = ({ name, age }) => {
    return <h2>Hola  mi nombre es {name} y mi edad es { age }  y este es mi primer React TypeScript</h2>
}

export default Greeting;