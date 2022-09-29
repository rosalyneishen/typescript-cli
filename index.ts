import * as _ from 'lodash';

import { Charity } from './models/Charity';
import { Profile } from './models/Profile';
import { TailoringForCategoriesEnum } from './models/TailoringForCategoriesEnum';
import { readCharities, readProfile } from './read-helpers';

const N_TOTAL = 12;
const N_MAX_STATE = 5;
const N_RANDOM_STATE = _.random(0, N_MAX_STATE);
const N_MIN_CUSTOM_TAILORING = 4;
let N_RANDOM_TAILORING = _.random(N_MIN_CUSTOM_TAILORING, N_TOTAL)

function pickCharities(charities: Charity[], profile: Profile, customTailoring: boolean): string[] {
    const stateFilteredCharities = calculateState(charities, profile);
    const nationalFilteredCharities = calculateNational(charities);
    let filteredCharities = [ ...nationalFilteredCharities, ...stateFilteredCharities];

    // For part II 
    // (if you passed 'true' in the command line as an argument for customTailoring)
    var customTailoredCharities: Charity[] = [];
    if (customTailoring) {
        customTailoredCharities = filterTailoredCharities(filteredCharities, profile);
    }
    // END of for part II

    filteredCharities = _(filteredCharities)
        .shuffle() // loDash .shuffle() uses Fisher-Yates method
        .take(customTailoring ? N_TOTAL - N_RANDOM_TAILORING : N_TOTAL)
        .concat(customTailoredCharities)
        .shuffle()
        .value();

    return formatCharities(filteredCharities);
}

function calculateState(charities: Charity[], profile: Profile): Charity[] {
    return _(charities)
        .shuffle()
        .filter(c => c.featured == 'STATE' && c.state == profile.state)
        .take(N_RANDOM_STATE)
        .value();
}

function calculateNational(charities: Charity[]): Charity[] {
    return _(charities)
        .shuffle()
        .filter(c => c.featured === 'NATIONAL')
        .value();
}

function formatCharities(charitiyJson): string[] {
    let formattedJson: string[] = [];
    charitiyJson.forEach(charity => {
        const formattedCharity = `${charity.id}, ${charity.name}, ${charity.state}, ${charity.category}, ${charity.featured}`;
        formattedJson.push(formattedCharity);
    });
    return formattedJson;
}

function filterTailoredCharities(charities: Charity[], profile: Profile): Charity[] {
    _.forIn(TailoringForCategoriesEnum, function(value, key) {
        if (profile[key] && TailoringForCategoriesEnum[key]) {
            charities = _(charities).filter(c => c.category == TailoringForCategoriesEnum[key]).shuffle().take(N_RANDOM_TAILORING).value();
        }
        else {
            charities = [];
            N_RANDOM_TAILORING = 0;
        }
    });
    return charities
}

async function main() {
    const [, , charitiesPath, profilePath, customTailoring] = process.argv;

    let charitiesData = await readCharities(charitiesPath);
    let profileData = await readProfile(profilePath);
    let customTailoringData = customTailoring === 'true';

    const charities: Charity[] = charitiesData.map(data => {
        return <Charity> {
            name : data.name,
            id: data.id,
            state: data.state,
            category: data.category,
            featured: data.featured
        };
    });

    const profile: Profile  = {
        name : profileData.name,
        id: profileData.id,
        state: profileData.state,
        isMarried: profileData.isMarried,
        hasChildren: profileData.hasChildren,
        hasPets: profileData.hasPets,
        age: profileData.age
    };

    const charitiesToFeature = pickCharities(charities, profile, customTailoringData);
    console.dir(charitiesToFeature);
}
main();
