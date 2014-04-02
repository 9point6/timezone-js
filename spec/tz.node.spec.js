for (var k in require.cache) {
  if (k.indexOf('date.js') > -1) {
    delete require.cache[k];
  }
}
var TimezoneJS = require('../src/date');
TimezoneJS.timezone.zoneFileBasePath = 'lib/tz';
TimezoneJS.timezone.defaultZoneFile = 'asia';
TimezoneJS.timezone.init({
  'async': false
});

describe('TimezoneJS (Node.js)', function () {
  it('should preload everything correctly', function () {
    expect(TimezoneJS.timezone.loadingScheme).toEqual(TimezoneJS.timezone.loadingSchemes.LAZY_LOAD);
    expect(TimezoneJS.timezone.loadedZones.asia).toBe(true);
    sampleTz = TimezoneJS.timezone.getTzInfo(new Date(), 'Asia/Bangkok');
    expect(sampleTz).toBeDefined();
    expect(sampleTz.tzAbbr).toEqual('ICT');
  });

  it('should load additional files manually correctly', function () {
    TimezoneJS.timezone.loadZoneFile('europe', {'async': false});
    expect(TimezoneJS.timezone.loadingScheme).toEqual(TimezoneJS.timezone.loadingSchemes.LAZY_LOAD);
    expect(TimezoneJS.timezone.loadedZones.europe).toBe(true);
    sampleTz = TimezoneJS.timezone.getTzInfo(new Date(), 'Europe/London');
    expect(sampleTz).toBeDefined();
    expect(sampleTz.tzAbbr).toMatch(/BST|GMT/);
  });
});
