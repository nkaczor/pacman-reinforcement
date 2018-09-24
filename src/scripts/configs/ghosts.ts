import ghost1 from '../../assets/1.svg';
import ghost2 from '../../assets/2.svg';
import ghost3 from '../../assets/3.svg';
import ghost4 from '../../assets/4.svg';

export enum GhostType {
    red = 'red',
    green = 'green',
    blue = 'blue',
    pink = 'pink'
}

export const ghostConfig = {
    [GhostType.red]: {
        imgUrl: ghost1,
        speed: 1.5
    },
    [GhostType.pink]: {
        imgUrl: ghost2,
        speed: 1.4
    },
    [GhostType.blue]: {
        imgUrl: ghost3,
        speed: 1.2
    },
    [GhostType.green]: {
        imgUrl: ghost4,
        speed: 1.2
    }
}
