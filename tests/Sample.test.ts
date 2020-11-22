import "reflect-metadata";
import {suite, test} from "@testdeck/mocha";
import {expect} from 'chai';

@suite
class SampleTest {

    @test
    world() {
        expect(true).to.be.true;
    }
}
