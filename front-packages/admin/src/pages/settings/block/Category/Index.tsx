import * as React from 'react';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/container';
const categories = [
    {
        id: '1',
        name: 'Electronics',
        children: [
            {
                id: '1-1',
                name: 'Mobiles',
                children: [
                    { id: '1-1-1', name: 'Samsung' },
                    { id: '1-1-2', name: 'iPhone' },
                ],
            },
            {
                id: '1-2',
                name: 'Laptops',
            },
        ],
    },
    {
        id: '2',
        name: 'Fashion',
        children: [
            {
                id: '2-1',
                name: 'Men',
                children: [
                    { id: '2-1-1', name: 'Shirts' },
                    { id: '2-1-2', name: 'Shoes' },
                ],
            },
            {
                id: '2-2',
                name: 'Women',
                children: [
                    { id: '2-2-1', name: 'Dresses' },
                    { id: '2-2-2', name: 'Bags' },
                ],
            },
        ],
    },
];
const handleCustomAction = (nodes:any) => {
    console.log("we are here", nodes);
}

const renderTree = (nodes: any) => (
    <TreeItem key={nodes.id} itemId={nodes.id} label={nodes.name} 
        onClick={() => handleCustomAction(nodes)}>
        {Array.isArray(nodes.children)
            ? nodes.children.map((node: any) => renderTree(node))
            : null}
    </TreeItem>
);

const CategoryContainer = () => {
    return (
        <Fragment>
            <Container>
            <div className="flex">
                <div className="w-64 flex-initial ...">02</div>
                <div className="w-14 flex-none ...">01</div>
                <div className="w-32 flex-initial ...">03</div>
            </div>
            <div className="flex flex-row">
                <div className="basis-128">
                    <SimpleTreeView>
                        {categories.map((category) => renderTree(category))}
                    </SimpleTreeView>
                </div>
                <div className="basis-64">
                    <h1>Category Translations</h1>
                </div>
            </div>

            </Container>
        </Fragment>
    );
}

export { CategoryContainer };