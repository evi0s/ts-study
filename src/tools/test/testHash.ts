import { hash, judge } from "../hash";
import { expect } from 'chai';

describe('hash', function(){
    it('hashTest#1', function(){
        let raw = "asdasd";

        let result = hash(raw);

        expect(result).to.be.equal("dc5464292c803d3c29748b71cb7f01a7ab5309501f9cbf04b71751b34b6f2353");
    });

    it('judgeTest#1', function(){
        let raw = "asdasd";

        let result = judge(raw, hash(raw));

        expect(result).to.be.true;
    });

    it('judgeTest#2', function(){
        let raw = "asdasd";

        let result = judge("asdasdf", hash(raw));

        expect(result).to.be.false;
    });
});
