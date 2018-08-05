import React from 'react';

/**
 * @description Responsavel do Header da aplicação
 * @param title Passando a string do texto
 */
export default props => (
    <div className="list-books-title">
        <h1>{props.title}</h1>
    </div>
);