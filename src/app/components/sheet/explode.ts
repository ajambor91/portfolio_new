import { ElementRef } from "@angular/core";
import { relative } from "path";
let size = {};
const cols = 2;
const rows = 2;
const cloneElement = (element: HTMLElement): Node[] => {
    const elements: Node[] = [];
    for (let i = 0; i < (cols + rows); i++) {
        const node = element.cloneNode(true);
        elements.push(node);
    }
    return elements;
}

const divideElements = (elements: Node[], nativeElement): HTMLDivElement[] => {
    const newElements: HTMLDivElement[] = [];
    elements.forEach((item: Node, index: number) => {
        const element = document.createElement('div');
        element.append(item);
        element.style.position = 'relative';
        element.style.zIndex = '40';
        element.style.overflow = 'hidden';
        element.style.outline = '1px';
        nativeElement.parentNode.append(element);
        nativeElement.parentNode.style.background = 'none';
        newElements.push(element)
    });

    return newElements;
}
const moveParent = (elements: HTMLDivElement[]) => {
    elements.forEach((element: Node, index: number) => {
        //@ts-ignore
        element.style.width = size.width;
        //@ts-ignore
        element.style.height = size.height;
        switch (index) {
            case 0:
                //@ts-ignore
                element.style.top = '-50%';
                //@ts-ignore
                element.style.left = '-50%';
                break;
            case 1:
                //@ts-ignore
                element.style.top = '-150%';
                //@ts-ignore
                element.style.left = '50%';
                break;
            case 2:
                //@ts-ignore
                element.style.top = '-150%';
                //@ts-ignore
                element.style.left = '-50%';
                break;
            case 3:
                //@ts-ignore
                element.style.top = '-250%';
                //@ts-ignore
                element.style.left = '50%';
        }
    })
}

const setElementCoords = (elements: HTMLDivElement[]) => {
    //@ts-ignore
    elements.forEach((item: HTMLDivElement, index: number) => {
        console.log(size)
        const element = item.children[0];
        //@ts-ignore
        element.style.overflow = 'hidden';
        //@ts-ignore
        element.style.position = 'relative';
        //@ts-ignore
        element.style.width = size.width;
        //@ts-ignore
        element.style.height = size.height;
        switch (index) {
            case 0:
                //@ts-ignore
                element.style.top = '50%';
                element.id = `${index}-explode-element`;
                //@ts-ignore
                element.style.left = '50%';
                break;
            case 1:
                //@ts-ignore
                element.style.top = '50%';
                //@ts-ignore
                element.style.left = '-50%';
                element.id = `${index}-explode-element`;

                break;
            case 2:
                //@ts-ignore
                element.style.top = '-50%';
                //@ts-ignore
                element.style.left = '50%';
                element.id = `${index}-explode-element`;

                break;
            case 3:
                //@ts-ignore
                element.style.top = '-50%';
                //@ts-ignore
                element.style.left = '-50%';
                element.id = `${index}-explode-element`;
                break;
        }
    });
}
const explodeElements = (elements: HTMLDivElement[]) => {
    return new Promise(resolve => {

        let i = 0;
        const interval = setInterval(() => {
            elements.forEach((element: HTMLDivElement, index: number) => {
                switch (index) {
                    case 0:
                        //@ts-ignore
                        element.style.top = `-${calcNewCoord(element.style.top)}`;
                        //@ts-ignore
                        element.style.left = `-${calcNewCoord(element.style.left)}`;
                        break;
                    case 1:
                        //@ts-ignore
                        element.style.top = `-${calcNewCoord(element.style.top)}`;
                        //@ts-ignore
                        element.style.left = calcNewCoord(element.style.left);
                        break;
                    case 2:
                        //@ts-ignore
                        element.style.top = `-${calcNegativeCoord(element.style.top)}`;
                        //@ts-ignore
                        element.style.left = `-${calcNewCoord(element.style.left)}`;
                        break;
                    case 3:
                        //@ts-ignore
                        element.style.top = `-${calcNegativeCoord(element.style.top)}`;
                        //@ts-ignore
                        element.style.left = `${calcNewCoord(element.style.left)}`;
                        break;
                }

            });
            i++
            if (i > 50) {
                clearInterval(interval);
                resolve(true);
            }
        }, 10)
    });
}

const calcNewCoord = (coord: string) => {
    return `${Math.abs(+coord.replace('%', '')) + 1}%`;
}

const calcNegativeCoord = (coord: string) => {
    return `${Math.abs(+coord.replace('%', '')) - 1}%`;

}
const appendElements = (elements: HTMLDivElement[], nativeElement): Promise<boolean> => {
    return new Promise(resolve => {
        setTimeout(() => {
            nativeElement.style.visibility = 'hidden';
            setTimeout(() => {
                resolve(true);
            }, 250);
        }, 50)
    });
}

export const explode = (element: ElementRef): Promise<boolean> => {
    const nativeElement = element.nativeElement.children[0];
    console.log(nativeElement);
    size = {
        width: window.getComputedStyle(nativeElement.parentNode).width,
        height: window.getComputedStyle(nativeElement.parentNode).height
    };
    let nodes = cloneElement(nativeElement);
    let elements = divideElements(nodes, nativeElement);
    moveParent(elements);
    setElementCoords(elements);
    return new Promise(resolve => {
        appendElements(elements, nativeElement).then(() => {
            return explodeElements(elements).then(res => {
                resolve(true);
            });
        });
    })
}

