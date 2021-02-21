import { ElementRef } from "@angular/core";
import { relative } from "path";

const cols = 2;
const rows = 2;
const cloneElement = (element: HTMLElement): Node[]  => {
    const elements: Node[] = [];
    for(let i = 0; i < (cols + rows) * 2 - 1; i++  ){
        const node = element.cloneNode(true);
        elements.push(node);
    }
    return elements;
}

const divideElements = (elements: Node[], nativeElement)  => {
    elements.forEach(item => {
        const element = document.createElement('div');
        element.append(item);
        element.style.position = 'relative';
        element.style.zIndex = '999';
        //@ts-ignore
        const child = element.children[0].children[0];
        //@ts-ignore
        child.style.left = '100px';
        nativeElement.parentElement.append(element);
    })
}

export const explode = (element: ElementRef) => {
    const nativeElement = element.nativeElement;
    const size = {
        width: nativeElement.style.width.replace('px',''),
        height: nativeElement.style.height.replace('px', '')
    }
    const elements = cloneElement(nativeElement);
    divideElements(elements, nativeElement);


}

