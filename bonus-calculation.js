
module.exports = getBonuses;


function calculateContribution(data) {
    return data.members.map(function calculateContribution(member) {
        return member.salary * (data.bonusPercent / 100);
    });
}


function calculateRate(contributionValues, teamCount) {
    return contributionValues.map(function calculateRate(contribution) {
        return contribution * teamCount / 100;
    });
}


function calculateEngagementDiff(members, teamCount) {
    return members.map(function calculateEngagementDiff(member) {
        return member.engagement - 100 / teamCount;
    });
}

function addPositiveEngagement(engagements) {
    return engagements.filter(function filterNegativeEng(engagement) {
        return engagement > 0;
    }).reduce(function addPositiveEngagement(prev, curr) {
        return prev + curr;
    }, 0);
}

function calculateAddedPool(engagementsDiff, contributionRates) {
    function flatPositiveValue(value) {
        if (value > 0) {
            return 0;
        } else {
            return value;
        }
    }

    return engagementsDiff.map(function calculateAddedPool(engagement, index) {
        return flatPositiveValue(engagement * contributionRates[index]);
    });

}

function calculateAddedValues(addedPool, engagementsDiff, positiveEngagementSum, addedPoolSum) {
    return addedPool.map(function (pool, index) {
        return pool === 0 ? (engagementsDiff[index] / positiveEngagementSum) * addedPoolSum : pool;
    });
}

function addPoolValues(pools) {
    return pools.reduce(function add(prev, curr) {
        return prev - curr;
    }, 0);
}

function calculateBonus(members, contributionValues, addedValues) {
    return contributionValues.map(function calculateNegative(contribution, index) {
        return { name: members[index].name, bonus: Math.round((contribution + addedValues[index]) * 1e2) / 1e2 };
    })
}


function getBonuses(data) {
    var members = data.members,
        teamCount = members.length,
        engagementsDiff = calculateEngagementDiff(members, teamCount),
        addedPool = calculateAddedPool(engagementsDiff, calculateRate(calculateContribution(data), teamCount));
    return calculateBonus(members,
        calculateContribution(data),
        calculateAddedValues(addedPool, engagementsDiff, addPositiveEngagement(engagementsDiff), addPoolValues(addedPool))
    );
}